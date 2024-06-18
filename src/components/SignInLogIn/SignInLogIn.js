import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './input.css'
import { setAllEmpty,handleLoginAreaStyle,handleRegAreaStyle } from './SignInLoginHelperFunc';
import { contextData } from '../../AllStates';

const SignInLogIn = () => {

  const context=useContext(contextData);
  const {backendLink,user,setUser,canDoInitialLoading,setCanDoInitialLoading}=context;

  const [loginUser,setLoginUser]=useState('');
  const [regUser,setRegUser]=useState('');
  const [loginPassword,setLoginPassword]=useState('');
  const [regPassword,setRegPassword]=useState('');
  const [regConfirmPassword,setRegConfirmPassword]=useState('');
  const [regMsg,setRegMsg]=useState('');
  const [logMsg,setLogMsg]=useState('');
  const [regEmail,setRegEmail]=useState('');
  const [logEmail,setLogEmail]=useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    setLogMsg("");
    setRegMsg("");
    setAllEmpty();
    handleLoginArea();
  },[]);

  const handleLoginArea=()=>{
    setLogMsg("");
    setAllEmpty();
    handleLoginAreaStyle();
  }
  const handleRegArea=()=>{
    setRegMsg("");
    setAllEmpty();
    handleRegAreaStyle();
  }

  useEffect(()=>{
    setAllEmpty();
  },[regMsg,setRegMsg,logMsg,setLogMsg]);
  
  const Register=async()=>{
    if(regPassword!==regConfirmPassword){
      console.log('Passwords do not match.');
      setRegMsg('Passwords do not match.');
      return;
    }
    const payload={
      username:regUser,
      email:regEmail,
      password:regPassword
    }
    const apiLink=`${backendLink}/auth/register`;
    try{
      const res=await axios.post(apiLink,payload);
      const result=res.data;
      console.log(result);
      setRegMsg(`Registered Successfully!!`);
      const mongo_id=result.others._id
      console.log(mongo_id);
      setUser({ username: result.others.username, email: result.others.email, user_mongo_id: mongo_id });
      localStorage.setItem('u-token', result.token);
      localStorage.setItem('u-email',result.others.email);
      localStorage.setItem('u-id', mongo_id);
      localStorage.setItem('u-username', result.others.username);
      setCanDoInitialLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }catch(err){
      console.log(err);
      if(err.response.status===500){
        window.alert(err.response.data);
      }
    }
  }
  const Login=async()=>{
    const payload={
      email:logEmail,
      password:loginPassword
    }
    const apiLink=`${backendLink}/auth/login`;
    try{
      console.log('axios bulane se pehle');
      const res=await axios.post(apiLink,payload);
      console.log(res);
      const result=res.data;
      console.log(result);
      setLogMsg('Logged in successfully!!');
      const mongo_id=result.others._id
      console.log(mongo_id);
      setUser({ username: result.others.username, email: result.others.email, user_mongo_id: mongo_id });
      localStorage.setItem('u-token', result.token);
      localStorage.setItem('u-email',result.others.email);
      localStorage.setItem('u-id', mongo_id);
      localStorage.setItem('u-username', result.others.username);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }catch(err){
      console.log(err);
      if(err.response.status===500){
        window.alert(err.response.data);
      }
    }
  }
  return (
    <div className='SignInLogIn'>
      <div className="mainRegLoginBox">
        <div className="regLoginBox">
          <div className="selectLoginOrReg">
            <div id="login" onClick={handleLoginArea}>
              Login
            </div>
            <div id="register" onClick={handleRegArea}>
              Register
            </div>
          </div>
        </div>
        <div className="mainRegLogBox">
          <div id="loginBox">
            <div className='loginRegInpFields'>
              <div className="field field_v1">
                <label htmlFor="userEmailLogin" className="ha-screen-reader">Email</label>
                <input type='email' id="userEmailLogin" className="field__input" placeholder="" onChange={(e)=>setLogEmail(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">Email</span>
                </span>
              </div>
              <div className="field field_v1">
                <label htmlFor="userPasswordLogin" className="ha-screen-reader">Password</label>
                <input type='password' id="userPasswordLogin" className="field__input" placeholder="" onChange={(e)=>setLoginPassword(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">Password</span>
                </span>
              </div>
            </div>
            <div id="loginBtn" onClick={Login}>
              Login
            </div>
            <div className="signUpLogIn" id='loginMsg'>{logMsg}</div>
          </div>
          <div id="regBox">
            <div className='loginRegInpFields'>
              <div className="field field_v1">
                <label htmlFor="userNameReg" className="ha-screen-reader">User Name</label>
                <input id="userNameReg" className="field__input" placeholder="" onChange={(e)=>setRegUser(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">User Name</span>
                </span>
              </div>
              <div className="field field_v1">
                <label htmlFor="userEmailReg" className="ha-screen-reader">Email</label>
                <input type='email' id="userEmailReg" className="field__input" placeholder="" onChange={(e)=>setRegEmail(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">Email</span>
                </span>
              </div>
              <div className="field field_v1">
                <label htmlFor="userPasswordReg" className="ha-screen-reader">Password</label>
                <input type='password' id="userPasswordReg" className="field__input" placeholder="" onChange={(e)=>setRegPassword(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">Password</span>
                </span>
              </div>
              <div className="field field_v1">
                <label htmlFor="userPasswordComfirmReg" className="ha-screen-reader">Confirm Password</label>
                <input type='password' id="userPasswordComfirmReg" className="field__input" placeholder="" onChange={(e)=>setRegConfirmPassword(e.target.value)}/>
                <span className="field__label-wrap" aria-hidden="true">
                  <span className="field__label">Confirm Password</span>
                </span>
              </div>
            </div>
            <div id="regBtn" onClick={Register}>
              Register
            </div>
            <div className="signUpLogIn" id='registerMsg'>{regMsg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInLogIn;
