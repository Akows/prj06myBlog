import './App.css';
import './ResetStyle.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';

import AppMenu from './components/AppMenu';

import Home from './pages/Home';
import DailyRecord from './pages/DailyRecord';
import MyStudyRecord from './pages/MyStudyRecord';
import MyProject from './pages/MyProject';
import Login from './pages/Login';

import RecordItem from './components/DailyRecordItem';
import RecordEditor from './components/DailyRecordEditor';

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

  // 로그인 상태.
  const [isLogin, setIsLogin] = useState(false);
  const [whoLogin, setWhoLogin] = useState('');

  ////////////////////////////////////////////

  const today = new Date();

  const Time = {
      year: today.getFullYear(),  // 년도
      month: today.getMonth() + 1, // 월
      date: today.getDate(), // 날짜
      hours: today.getHours(), // 시간
      minutes: today.getMinutes(), // 분
      now: today.getFullYear() + '년 ' +  (today.getMonth() + 1) + '월 ' + today.getDate() + '일' 
  };
  
  ////////////////////////////////////////////

  // // 게시판 데이터 수정 함수. 
  // const boardUpdate = async (id) => {
  //   try {
  //     await addDoc(collection(fireStoreDB, 'DailyRecord'), {
  //       Create_date: setTimeinfo(),
  //       Title: dailyRecordData.Title,
  //       Text: dailyRecordData.Text,
  //       Writer: isLogin.email
  //     });
  //     alert('글이 수정되었습니다.');
  //     navigate('/', { replace: true });
  //   } 
  //   catch (e) {
  //     console.error(e);
  //   }
  // };

  //   // 게시판 데이터 삭제 함수. 
  //   const boardDelete = async (id) => {
  //     try {
  //       await deleteDoc(doc(fireStoreDB, 'DailyRecord', id));
  //       alert('글이 삭제되었습니다.');
  //       navigate('/', { replace: true });
  //     } 
  //     catch (e) {
  //       console.error(e);
  //     }
  //   };
  

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // Lifecycle - useEffect().
  // Lifecycle - useEffect().

  // 페이지 진입 후 1회만 실행. 로그인 유효 여부를 확인.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setWhoLogin(user.email);
        setIsLogin(true);
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
            <Route path='/recorditem/:id' element={<RecordItem/>}/>
            <Route path='/recordeditor/:id' element={<RecordEditor/>}/>
          </Routes>
        </div>

      </LoginContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default App;
