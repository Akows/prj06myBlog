import { useState } from 'react'
import { appAuth } from '../configs/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {

    // 상태 변수 설정
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    // useAuthContext 훅으로부터 dispatch 함수 받아오기
    const { dispatch } = useAuthContext();

    // React Router의 useNavigate 훅 사용하기
    const navigate = useNavigate();

    // 회원가입 함수 정의
    const signup = (email, password, displayName) => {
        setError(null);
        setIsPending(true);
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                if (!user) {
                    throw new Error('회원가입에 실패했습니다.');
                };
                // 사용자의 프로필 업데이트
                updateProfile(appAuth.currentUser, { displayName })
                    .then(() => {
                        // 모든 과정이 성공
                        dispatch({ type: 'login', payload: user });
                        setError(null);
                        setIsPending(false);
                        alert('새로운 회원이 되신것을 환영합니다.');
                        navigate('/signup', { replace: true });
                    })
                    .catch((err) => {
                        // 업데이트에서 에러
                        setError(err.message);
                        setIsPending(false)
                        console.log(err.message);
                        alert('새로운 회원이 되신것을 환영합니다.');
                        navigate('/signup', { replace: true });
                    });
            })
            .catch((err) => {
                // 가입에서 에러
                setError(err.message);
                setIsPending(false);
                console.log(err.message);
            });
    };
    return { error, isPending, signup };
};