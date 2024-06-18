import React, { useContext, useEffect, useState } from 'react'
import './ContactMsg.css'
import { contextData } from '../../AllStates';

const ContactMsg = ({contact,lastMessage}) => {
  const context=useContext(contextData);
  const {presentlyChattingWith,setPresentlyChattingWith,setCanDoInitialLoading,showContactsNotChats,setShowContactsNotChats}=context;
  const [isHovered,setIsHovered]=useState(false);
  try{
  const convertMsg=(msg)=>{
    if(msg==""){
      return msg;
    }
    if(msg.length>30){
      msg=msg.slice(0,30)+"...";
    }
    return msg;
  }
  const loadChats=(e)=>{
    localStorage.setItem('c-username',contact.username);
    localStorage.setItem('c-email',contact.email);
    localStorage.setItem('c-id',contact._id);
    const temp={
      username:localStorage.getItem('c-username'),
      email:localStorage.getItem('c-email'),
      mongo_id:localStorage.getItem('c-id')
    }
    setPresentlyChattingWith(temp);
    setCanDoInitialLoading(true);
    setShowContactsNotChats(false);
  }
  function convertToFormattedDate(isoString) {
    if(isoString==="2000-01-01T00:00:00.000Z"){
      return "";
    }
    const date = new Date(isoString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() is zero-based
    let year = date.getFullYear() % 100; // get the last two digits of the year
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');
    year = year.toString().padStart(2, '0');
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
  
    return formattedDate;
  }
  // style={presentlyChattingWith.email===contact.email?{'backgroundColor':'rgb(229, 225, 225)'}:{'backgroundColor':'white'}}
  return (
    <div className='contactMsg' id={contact.email} onClick={loadChats} style={{'backgroundColor':(presentlyChattingWith.email===contact.email||isHovered)?'rgb(229, 225, 225)':'white'}} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>
    setIsHovered(false)}>
      <div className="nameAndLastTime">
        <div className="contactUserName">{contact.username}</div>
        <div className="contactLastMsgTime">{convertToFormattedDate(lastMessage.updatedAt)}</div>
      </div>
      <div className="lstMsg">{convertMsg(lastMessage.msg)}</div>
    </div>
  )
}catch(er){
  console.log(er);
}
}

export default ContactMsg
