import React, { useContext } from 'react'
import './BackBtn.css'
import back from './back.png'
import { contextData } from '../../AllStates'

const BackBtn = () => {
  const context=useContext(contextData);
  const {showContactsNotChats,setShowContactsNotChats}=context;
  return (
    <div className='backDiv' onClick={()=>setShowContactsNotChats(true)}>
      <img src={back} alt="" className='backImg'/>
    </div>
  )
}

export default BackBtn
