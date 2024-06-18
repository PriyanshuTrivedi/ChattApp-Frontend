import React, { useContext } from 'react';
import { contextData } from '../../AllStates';
import './Logout.css';
import LogoutPic from './LogoutPic.png'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const context=useContext(contextData);
  const {setUser,setPresentlyChattingWith}=context;
  const logout=()=>{
    localStorage.clear();
    console.log(localStorage);
    const emptyInfo={username:'', email:'', mongo_id:''};
    setUser(emptyInfo);
    setPresentlyChattingWith(emptyInfo);
    navigate('/auth');
  }
  return (
    <div className="name_logout">
      <div className="userName">
        {localStorage.getItem('u-username')}
      </div>
      <div className='logoutBtn' onClick={logout}>
        <img src={LogoutPic} className='logoutPic' />
      </div>
    </div>
  )
}

export default Logout
