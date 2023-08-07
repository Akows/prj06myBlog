import { useEffect, useState } from 'react';
import { useLogin } from '../../customhooks/useLogin';
import styles from '../../styles/Login.module.css'

export default function Login() {

    // useLogin 커스텀 훅으로부터 로그인 기능과 상태를 가져옴
    const { error, isPending, login, anonymousLogin } = useLogin();
    const [userData, setUserData] = useState({
        id: '',
        pwd: ''
    });

    const loginEvent = (event) => {
        event.preventDefault();
        login(userData.id, userData.pwd);
    };

    // eslint-disable-next-line
    const anonymousLoginEvent = (event) => {
        event.preventDefault();
        anonymousLogin();
    };

    // 입력 필드 값 변경 시 호출되는 함수
    const onChangeEvent = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    };

    // 페이지 타이틀 설정
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
                    <input name='id' type='text' required placeholder='이메일을 입력해주세요' value={userData.id} onChange={onChangeEvent} />
                </div>
                <div className={styles.input}>
                    <label htmlFor='pwd'>password : </label>
                    <input name='pwd' type='password' required placeholder='비밀번호를 입력해주세요' value={userData.pwd} onChange={onChangeEvent} />
                </div>
                <div className={styles.loginbutton}>
                    {!isPending && <button type='submit' className={styles.submitbutton}>로그인</button>}
                    {/* {!isPending && <button className={styles.submitbutton2} onClick={anonymousLoginEvent}>비로그인 접속하기</button>} */}
                    {isPending && <><br /><strong>로그인이 진행중입니다...</strong></>}
                    {error && <><br /><strong>로그인 에러가 발생하였습니다...</strong></>}
                </div>
            </form>
        </div>
    );
};