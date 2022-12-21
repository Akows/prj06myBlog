import './Login.css';
import '../ResetStyle.css';

import { useRef, useState } from 'react';




import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8RSSUpHwD6gU_Om4Iyjlk_JnduE_VzPQ",
  authDomain: "myblog-350b6.firebaseapp.com",
  projectId: "myblog-350b6",
  storageBucket: "myblog-350b6.appspot.com",
  messagingSenderId: "231330171061",
  appId: "1:231330171061:web:53d2fb772e4fae4ea316fc"
};

const app = initializeApp(firebaseConfig);





const Login = () => {

    const ref = useRef();

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

    const submitEvent = () => {
        if (inputData.ID.length < 1 || inputData.PWD.length < 1 ) {
            ref.current.focus();
            return;
        }

        console.log(inputData.ID);
        console.log(inputData.PWD);

        console.log(app);

        
    };



























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

                <button className='submitbutton' onClick={submitEvent}>
                    로그인
                </button>

            </div>
 

        </div>
    );
};

export default Login;