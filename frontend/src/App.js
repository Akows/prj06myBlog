import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthContext } from './customhooks/useAuthContext';
import TopMenuBar from './components/TopMenuBar';
import Main from './pages/main/Main';
import Login from './pages/user/Login';
import Questions from './pages/questions/Questions';
import QuestionsItem from './pages/questions/QuestionsItem';
import DailyRecord from './pages/recodes/DailyRecord';
import DailyRecordItem from './pages/recodes/DailyRecordItem';
import StudyRecord from './pages/recodes/StudyRecord';
import StudyRecordItem from './pages/recodes/StudyRecordItem';
import TextEditor from './pages/editor/TextEditor';

import './App.css';
import Signup from './pages/user/Signup';

function App() {
  const { user, isAuthReady } = useAuthContext();

  useEffect(() => {

    // console.log(user);

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
        <>
          <TopMenuBar />
          <Routes>

            <Route path='/' element={<Navigate to='/main' replace={true} />} />
            <Route path='/main' element={<Main />} />

            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' replace={true} />} />

            <Route path='/questions' element={<Questions />} />
            <Route path='/questions/:id' element={<QuestionsItem />} />
            <Route path='/dailyrecord' element={<DailyRecord />} />
            <Route path='/dailyrecord/:id' element={<DailyRecordItem />} />
            <Route path='/studyrecord' element={<StudyRecord />} />
            <Route path='/studyrecord/:id' element={<StudyRecordItem />} />

            <Route path='/texteditor/:type/:id' element={user ? <TextEditor /> : <Navigate to='/' replace={true} />} />

            <Route path='/test' element={<Signup />} />


            {/* <Route path='/' element={!user ? <Login /> : <Navigate to='/main' replace={true}/>} />
            <Route path='/main' element={user ? <Main /> : <Navigate to='/' replace={true}/>} />
            <Route path='/questions' element={user ? <Questions /> : <Navigate to='/' replace={true}/>} />
            <Route path='/questions/:id' element={user ? <QuestionsItem /> : <Navigate to='/' replace={true}/>} />
            <Route path='/dailyrecord' element={user ? <DailyRecord /> : <Navigate to='/' replace={true}/>} />
            <Route path='/dailyrecord/:id' element={user ? <DailyRecordItem /> : <Navigate to='/' replace={true}/>} />
            <Route path='/studyrecord' element={user ? <StudyRecord /> : <Navigate to='/' replace={true}/>} />
            <Route path='/studyrecord/:id' element={user ? <StudyRecordItem /> : <Navigate to='/' replace={true}/>} />
            <Route path='/texteditor/:type/:id' element={user ? <TextEditor /> : <Navigate to='/' replace={true}/>} /> */}
          </Routes>
        </>
      ) : 'loading...'}
    </div>
  );
};

export default App;
