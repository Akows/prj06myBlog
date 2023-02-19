import { useState } from 'react'
import { appAuth } from '../configs/firebase'
import { useAuthContext } from './useAuthContext'
import { signOut } from 'firebase/auth';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true);
        signOut(appAuth).then(() => {
            dispatch({ type: 'logout' });
            setError(null);
            setIsPending(false);
            alert('로그아웃되었습니다. 방문해주셔서 감사합니다.');
        }).catch((err) => {
            setError(err.message);
            setIsPending(false);
            console.log(err.message);
        });
    };
    return { error, isPending, logout };
};