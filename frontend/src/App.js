import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopMenuBar from './components/TopMenuBar';
import { useAuthContext } from './customhooks/useAuthContext';
import Main from './pages/main/Main';
import Login from './pages/user/Login';
import DailyRecord from './pages/recodes/DailyRecord';
import DailyRecordItem from './pages/recodes/DailyRecordItem';
import StudyRecord from './pages/recodes/StudyRecord';
import StudyRecordItem from './pages/recodes/StudyRecordItem';

import TextEditor from './pages/editor/TextEditor';

import './App.css';
import { useEffect } from 'react';


function App() {
  const { user, isAuthReady } = useAuthContext();

  useEffect(() => {

    console.log(user);

    // if (!user) {
    //   signInAnonymously(appAuth)
    //   .then(() => {
    
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   });
    // }
  }, []);

  return (
    <div className='App'>
      {isAuthReady ? (
        <BrowserRouter>
          <TopMenuBar />
          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/main' element={user ? <Main /> : <Navigate to='/' replace={true}/>} />


            <Route path='/dailyrecord' element={<DailyRecord />} />
            <Route path='/dailyrecord/:id' element={<DailyRecordItem />} />
            
            <Route path='/studyrecord' element={<StudyRecord />} />
            <Route path='/studyrecord/:id' element={<StudyRecordItem />} />

            <Route path='/texteditor/:type/:id' element={<TextEditor />} />
          </Routes>
        </BrowserRouter>
      ) : 'loading...'}
    </div>
  );
};

export default App;
