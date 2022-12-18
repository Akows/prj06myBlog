import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import DailyRecord from './Pages/DailyRecord';
import MyStudyRecord from './Pages/MyStudyRecord';
import MyProject from './Pages/MyProject';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dailyrecord' element={<DailyRecord/>}/>
          <Route path='/mystudyrecord' element={<MyStudyRecord/>}/>
          <Route path='/myproject' element={<MyProject/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
