import './Login.css';
import '../ResetStyle.css';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8RSSUpHwD6gU_Om4Iyjlk_JnduE_VzPQ",
  authDomain: "myblog-350b6.firebaseapp.com",
  projectId: "myblog-350b6",
  storageBucket: "myblog-350b6.appspot.com",
  messagingSenderId: "231330171061",
  appId: "1:231330171061:web:53d2fb772e4fae4ea316fc"
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const Login = () => {

    const ref = useRef();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        ID: '',
        PWD: ''
    });

    const onChangeEvent = (event) => {
        setInputData({
            ...inputData,
            [event.target.name] : event.target.value
        })
    };

    const loginEvent = () => {
        if (inputData.ID.length < 1 || inputData.PWD.length < 1 ) {
            ref.current.focus();
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        const auth = getAuth();

        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, inputData.ID, inputData.PWD)
            .then(() => {
              alert('로그인 완료!');
              navigate('/', { replace: true });
            })
            .catch((error) => {
              console.log(error.code, error.message);
            });
          })
          .catch((error) => {
            console.log(error.code, error.message);
          });
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
                    <input name='ID' type='text' placeholder='아이디를 입력해주세요' value={inputData.ID} ref={ref} onChange={onChangeEvent}/>
                </div>

                <div className='input'>
                    <input name='PWD' type='password' placeholder='비밀번호를 입력해주세요' value={inputData.PWD} ref={ref} onChange={onChangeEvent}/>
                </div>

                <button className='submitbutton' onClick={loginEvent}>
                    로그인
                </button>

            </div>
        </div>
    );
};

export default Login;