import { useState } from 'react'
import { appAuth } from '../configs/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = (email, password) => {
        setError(null);
        setIsPending(true);
        signInWithEmailAndPassword(appAuth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: 'login', payload: user });
            setError(null);
            setIsPending(false);
            if (!user) {
                throw new Error('로그인에 실패했습니다.');
            }
            alert('방문해주셔서 감사합니다.');
            navigate('/', { replace: true });
        })
        .catch((err) => {
            setError(err.message);
            setIsPending(false);
            console.log(err.message);
            alert('에러가 발생하였습니다.');
            navigate('/login', { replace: true });
        });

        // signOut(appAuth).then(() => {
        //     dispatch({ type: 'logout' });
        //     setError(null);
        //     setIsPending(false);

        // }).catch((err) => {
        //     setError(err.message);
        //     setIsPending(false);
        //     console.log(err.message);
        // });
    };

    return { error, isPending, login };
};