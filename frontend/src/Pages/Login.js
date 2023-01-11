import '../styles/Login.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../App';

import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const firebaseContext = useContext(FirebaseContext);

    const navigate = useNavigate();

    const [inputLoginData, setInputLoginData] = useState({
        ID: '',
        PWD: ''
    });

    const loginEvent = () => {
        setPersistence(firebaseContext.auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(firebaseContext.auth, inputLoginData.ID, inputLoginData.PWD)
            .then(() => {
            alert('로그인 완료!');
            navigate('/', { replace: true });
            })
            .catch((error) => {
            alert('아이디 혹은 비밀번호를 확인해주세요.');
            navigate('/login', { replace: true });
            console.log(error.code, error.message);
            });
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });
    };

    const onChangeEvent = (event) => {
        setInputLoginData({
            ...inputLoginData,
            [event.target.name] : event.target.value
        })
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '로그인';
    }, []);

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
                    <input name='ID' type='text' placeholder='아이디를 입력해주세요' value={inputLoginData.ID} onChange={onChangeEvent}/>
                </div>

                <div className='input'>
                    <input name='PWD' type='password' placeholder='비밀번호를 입력해주세요' value={inputLoginData.PWD} onChange={onChangeEvent}/>
                </div>

                <button className='submitbutton' onClick={loginEvent}>
                    로그인
                </button>

            </div>
        </div>
    );
};

export default Login;