import { useEffect, useState } from 'react';
import { useLogin } from '../../customhooks/useLogin';
import styles from '../../styles/Login.module.css'

export default function Login () {
    const { error, isPending, login } = useLogin();
    const [userData, setUserData] = useState({
        id: '',
        pwd: ''
    });

    const loginEvent = (event) => {
        event.preventDefault();
        login(userData.id, userData.pwd);
    };    
    const onChangeEvent = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '로그인 페이지';
    }, []);

    return (
        <div className={styles.login}>
            <form className={styles.loginform} onSubmit={loginEvent}>
                <p>로그인</p>
                <div className={styles.input}>
                    <label htmlFor='id'>email : </label>
                    <input name='id' type='text' required placeholder='이메일을 입력해주세요' value={userData.id} onChange={onChangeEvent}/>
                </div>
                <div className={styles.input}>
                    <label htmlFor='pwd'>password : </label>
                    <input name='pwd' type='password' required placeholder='비밀번호를 입력해주세요' value={userData.pwd} onChange={onChangeEvent}/>
                </div>
                {!isPending && <button type='submit' className={styles.submitbutton}>입력</button>}
                {isPending && <><br/><strong>로그인이 진행중입니다...</strong></>}
                {error && <><br/><strong>로그인 에러가 발생하였습니다...</strong></>}
            </form>
        </div>
    );
};