import { useState } from 'react'
import { appAuth } from '../configs/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = (email, password, displayName) => {
        setError(null);
        setIsPending(true);
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                if (!user) {
                    throw new Error('회원가입에 실패했습니다.');
                }
                updateProfile(appAuth.currentUser, { displayName })
                    .then(() => {
                        dispatch({ type: 'login', payload: user });
                        setError(null);
                        setIsPending(false);
                        alert('새로운 회원이 되신것을 환영합니다.');
                        navigate('/signup', { replace: true });
                    })
                    .catch((err) => {
                        setError(err.message);
                        setIsPending(false)
                        console.log(err.message);
                        alert('새로운 회원이 되신것을 환영합니다.');
                        navigate('/signup', { replace: true });
                    });
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
                console.log(err.message);
            });
    };
    return { error, isPending, signup };
};