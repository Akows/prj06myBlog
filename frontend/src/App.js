import './App.css';
import './ResetStyle.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';

import AppMenu from './components/AppMenu';
import Home from './pages/Home';
import DailyRecord from './pages/DailyRecord';
import MyStudyRecord from './pages/MyStudyRecord';
import MyProject from './pages/MyProject';
import Login from './pages/Login';
import RecordItem from './pages/RecordItem';
import RecordEditor from './pages/RecordEditor';

export const FirebaseContext = React.createContext();

function App() {

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // 구글 파이어베이스 코드
  // 구글 파이어베이스 코드

  // 파이어베이스 - 설정.
  const firebaseConfig = {
    apiKey: 'AIzaSyC8RSSUpHwD6gU_Om4Iyjlk_JnduE_VzPQ',
    authDomain: 'myblog-350b6.firebaseapp.com',
    projectId: 'myblog-350b6',
    storageBucket: 'myblog-350b6.appspot.com',
    messagingSenderId: '231330171061',
    appId: '1:231330171061:web:53d2fb772e4fae4ea316fc'
  };
  // 파이어베이스 - 정렬.
  // eslint-disable-next-line
  const app = initializeApp(firebaseConfig);
  // 파이어베이스 - 인증 기능 관련 함수 호출.
  const auth = getAuth();

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // 기능 구현을 위한 hook 호출 구문.
  // 기능 구현을 위한 hook 호출 구문.

  // 이벤트 이후 페이지 이동을 위한 useNavigate.
  const navigate = useNavigate();

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // 기능 구현에 사용되는 각종 변수를 제어하는 useState.
  // 기능 구현에 사용되는 각종 변수를 제어하는 useState. 

  // 입력된 로그인 데이터 제어.
  const [loginData, setLoginData] = useState({
    ID: '',
    PWD: ''
  });

  // 로그인 여부 값 제어.
  const [isLogin, setIsLogin] = useState(false);

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // 이벤트 함수들.
  // 이벤트 함수들.

  // 로그인 함수.
  const loginEvent = () => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        signInWithEmailAndPassword(auth, loginData.ID, loginData.PWD)
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

  // 로그아웃 함수.
  const logoutEvent = () => {
    signOut(auth)
      .then(() => {
          alert('로그아웃 되었습니다.');
          navigate('/', { replace: true });
      })
      .catch((error) => {
          console.log(error);
      });
  };

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // Lifecycle - useEffect().
  // Lifecycle - useEffect().

  // 페이지 진입 후 1회만 실행. 로그인 유효 여부를 확인.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(user);
      }
      else {
        setIsLogin(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  return (
    <FirebaseContext.Provider value={{loginEvent, logoutEvent, loginData, setLoginData, isLogin}}>
      <div className='app'>
        <AppMenu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dailyrecord' element={<DailyRecord/>}/>
          <Route path='/mystudyrecord' element={<MyStudyRecord/>}/>
          <Route path='/myproject' element={<MyProject/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/recorditem' element={<RecordItem/>}/>
          <Route path='/recordeditor' element={<RecordEditor/>}/>
        </Routes>
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
