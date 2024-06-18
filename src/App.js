import React from 'react';
import AllStates from './AllStates';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './components/Main/Main';
import SignInLogIn from './components/SignInLogIn/SignInLogIn';
import MobileMain from './components/MobileView/MobileMain';

function App() {
  console.log(window.screen.width);
  return (
    <AllStates>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={window.innerWidth>=1050?<Main/>:<MobileMain/>}></Route>
          <Route path='/auth' element={<SignInLogIn/>}></Route>
        </Routes>
      </BrowserRouter>
    </AllStates>
  );
}

export default App;
