import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopMenuBar from './components/TopMenuBar';
import { useAuthContext } from './customhooks/useAuthContext';
import Main from './pages/main/Main';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import DailyRecord from './pages/recodes/DailyRecord';
import RecordEditor from './pages/recodes/RecordEditor';
import DailyRecordItem from './pages/recodes/DailyRecordItem';
import StudyRecord from './pages/recodes/StudyRecord';
import RecordEditorSt from './pages/recodes/RecordEditorSt';
import StudyRecordItem from './pages/recodes/StudyRecordItem';
import './App.css';

function App() {
  const { isAuthReady } = useAuthContext();

  // useEffect(() => {
  //   if (!user) {
  //     signInAnonymously(appAuth)
  //     .then(() => {
    
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  //   }
  // }, []);

  return (
    <div className='App'>
      {isAuthReady ? (
        <BrowserRouter>
          <TopMenuBar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dailyrecord' element={<DailyRecord />} />
            <Route path='/dailyrecord/:id' element={<DailyRecordItem />} />
            <Route path='/recordeditor/:id' element={<RecordEditor />} />     
            <Route path='/studyrecord' element={<StudyRecord />} />
            <Route path='/recordeditorst/:id' element={<RecordEditorSt />} />     
            <Route path='/studyrecord/:id' element={<StudyRecordItem />} />
          </Routes>
        </BrowserRouter>
      ) : 'loading...'}
    </div>
  );
};

export default App;
