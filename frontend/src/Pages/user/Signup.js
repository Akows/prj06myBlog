import { useEffect, useState } from 'react';
import { useSignup } from '../../customhooks/useSignup';

import styles from '../../styles/Signup.module.css'

export default function Signup () {
    const { error, isPending, signup } = useSignup();
    const [userData, setUserData] = useState({
        id: '',
        pwd: '',
        nickname: ''
    });

    const loginEvent = (event) => {
        event.preventDefault();
        signup(userData.id, userData.pwd, userData.nickname);
    };    

    const onChangeEvent = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '회원가입 페이지';
    }, []);

    return (
        <div className={styles.signup}>
            <form className={styles.signupform} onSubmit={loginEvent}>
                <p>회원가입</p>
                <div className={styles.input}>
                    <label htmlFor='id'>email : </label>
                    <input name='id' type='text' required placeholder='이메일을 입력해주세요' value={userData.id} onChange={onChangeEvent}/>
                </div>
                <div className={styles.input}>
                    <label htmlFor='pwd'>password : </label>
                    <input name='pwd' type='password' required placeholder='비밀번호를 입력해주세요' value={userData.pwd} onChange={onChangeEvent}/>
                </div>
                <div className={styles.input}>
                    <label htmlFor='nickname'>nickname : </label>
                    <input name='nickname' type='text' required placeholder='닉네임을 입력해주세요' value={userData.nickname} onChange={onChangeEvent}/>
                </div>
                {!isPending && <button type='submit' className={styles.submitbutton}>입력</button>}
                {isPending && <><br/><strong>회원가입이 진행중입니다...</strong></>}
                {error && <><br/><strong>회원가입 에러가 발생하였습니다...</strong></>}
            </form>
        </div>
    );
};