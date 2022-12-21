import './App.css';
import './ResetStyle.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import DailyRecord from './Pages/DailyRecord';
import MyStudyRecord from './Pages/MyStudyRecord';
import MyProject from './Pages/MyProject';
import AppMenu from './Components/AppMenu';
import Login from './Pages/Login';

import { getAuth } from "firebase/auth";

export const UserContext = React.createContext();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setIsLogin(true);
      console.log(user);
    };
  }, []);

  return (
    <UserContext.Provider value={isLogin}>

    <BrowserRouter>
      <div className='app'>
        <AppMenu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dailyrecord' element={<DailyRecord/>}/>
          <Route path='/mystudyrecord' element={<MyStudyRecord/>}/>
          <Route path='/myproject' element={<MyProject/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
