import '../styles/Login.css';
import '../ResetStyle.css';

import { useContext } from 'react';
import { FirebaseContext } from '../App';

const Login = () => {

    const loginContext = useContext(FirebaseContext);

    const onChangeEvent = (event) => {
        loginContext.setLoginData({
            ...loginContext.loginData,
            [event.target.name] : event.target.value
        })
    };

    // 회원가입 기능, 테스트 완료.
    // 본 프로젝트에서 회원가입 기능은 구현하지 않을 것이므로 가입 메소드는 사용하지 않음.
    // eslint-disable-next-line
    // const joinEvent = () => { 
    //     const auth = getAuth();

    //     createUserWithEmailAndPassword(auth, inputData.ID, inputData.PWD)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         console.log(user, '회원가입 완료!');
    //     })
    //     .catch((error) => {
    //         console.log(error.code, error.message);
    //     });
    // };

    return (
        <div className='login'>
            <div className='loginform'>

                <p>Login</p>

                <div className='input'>
                    <input name='ID' type='text' placeholder='아이디를 입력해주세요' value={loginContext.loginData.ID} onChange={onChangeEvent}/>
                </div>

                <div className='input'>
                    <input name='PWD' type='password' placeholder='비밀번호를 입력해주세요' value={loginContext.loginData.PWD} onChange={onChangeEvent}/>
                </div>

                <button className='submitbutton' onClick={loginContext.loginEvent}>
                    로그인
                </button>

            </div>
        </div>
    );
};

export default Login;