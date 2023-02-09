import './App.css';
import './ResetStyle.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import AppMenu from './components/AppMenu';

import Home from './pages/Home';
import DailyRecord from './pages/DailyRecord';
import MyStudyRecord from './pages/MyStudyRecord';
import MyProject from './pages/MyProject';
import Login from './pages/Login';

import MyStudyRecordItem from './components/MyStudyRecordItem';
import MyStudyRecordEditor from './components/MyStudyRecordEditor';
import DailyRecordItem from './components/DailyRecordItem';
import DailyRecordEditor from './components/DailyRecordEditor';
import Test from './pages/Test';
import Test2 from './pages/Test2';

export const FirebaseContext = React.createContext();
export const LoginContext = React.createContext();

function App() {

  ////////////////////////////////////////////

  // 구글 파이어베이스.
  // 설정값.
  const firebaseConfig = {
    apiKey: 'AIzaSyC8RSSUpHwD6gU_Om4Iyjlk_JnduE_VzPQ',
    authDomain: 'myblog-350b6.firebaseapp.com',
    projectId: 'myblog-350b6',
    storageBucket: 'myblog-350b6.appspot.com',
    messagingSenderId: '231330171061',
    appId: '1:231330171061:web:53d2fb772e4fae4ea316fc'
  };
  // 파이어베이스 정렬.
  const app = initializeApp(firebaseConfig);
  // 파이어베이스 인증.
  const auth = getAuth();
  // 파이어스토어 호출.
  const fireStoreDB = getFirestore(app);

  ////////////////////////////////////////////

  const [isLogin, setIsLogin] = useState(false);
  const [whoLogin, setWhoLogin] = useState('익명');

  ////////////////////////////////////////////

  const today = new Date();

  const Time = {
      year: today.getFullYear(),  // 년도
      month: today.getMonth() + 1, // 월
      date: today.getDate(), // 날짜
      hours: today.getHours(), // 시간
      minutes: today.getMinutes(), // 분
      seconds: today.getSeconds(), // 초
      now: today.getFullYear() + '년 ' +  (today.getMonth() + 1) + '월 ' + today.getDate() + '일' 
  };
  
  ////////////////////////////////////////////

  const authStateCheck = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setWhoLogin(user.email);
        setIsLogin(true);
      }
      else {
        setWhoLogin('익명');
        setIsLogin(false);
      }
    });
  }

  ////////////////////////////////////////////

  useEffect(() => {
    authStateCheck();
    // eslint-disable-next-line
  }, []);

  ////////////////////////////////////////////

  return (

    <FirebaseContext.Provider value={{auth, fireStoreDB}}>
      <LoginContext.Provider value={{isLogin, whoLogin, Time}}>

        <div className='app'>
          <AppMenu/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dailyrecord' element={<DailyRecord/>}/>
            <Route path='/mystudyrecord' element={<MyStudyRecord/>}/>
            <Route path='/myproject' element={<MyProject/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dailyrecorditem/:id' element={<DailyRecordItem/>}/>
            <Route path='/dailyrecordeditor/:id' element={<DailyRecordEditor/>}/>
            <Route path='/mystudyrecorditem/:id' element={<MyStudyRecordItem/>}/>
            <Route path='/mystudyrecordeditor/:id' element={<MyStudyRecordEditor/>}/>

            <Route path='/test' element={<Test/>}/>
            <Route path='/test2' element={<Test2/>}/>
          </Routes>
        </div>

      </LoginContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default App;
