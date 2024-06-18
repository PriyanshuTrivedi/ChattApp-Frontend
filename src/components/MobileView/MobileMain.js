import React, { useContext,useEffect } from 'react'
import { contextData } from '../../AllStates'
import ChatBox from '../ChatBox/ChatBox';
import ContactsMsgBox from '../ContactsMsgBox/ContactsMsgBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const MobileMain = () => {
    const context=useContext(contextData);
  const {setUser,setCanDoInitialLoading,setContacts,setPresentlyChattingWith,presentlyChattingWith,backendLink,showContactsNotChats,setShowContactsNotChats}=context;
  const navigate = useNavigate();
  useEffect(()=>{
    try{
        async function loadUserContacts(){
            const url=`${backendLink}/auth/getContacts`;
            const payload={
                user:localStorage.getItem('u-email')
            }
            console.log( localStorage.getItem('u-email'))
            const res=await axios.post(url,payload,{headers:{Authorization:`Bearer ${localStorage.getItem('u-token')}`}});
            if(res.status===403){
              localStorage.clear();
              console.log(localStorage);
              const emptyInfo={username:'', email:'', mongo_id:''};
              setUser(emptyInfo);
              setPresentlyChattingWith(emptyInfo);
              navigate('/auth');
            }
            console.log(res);
            setContacts(res.data);
        }
        const initialSetPresentlyChattingWith=()=>{
            const temp={
                username:localStorage.getItem('c-username'),
                email:localStorage.getItem('c-email'),
                mongo_id:localStorage.getItem('c-id')
            }
            setPresentlyChattingWith(temp);
        }
        console.log('yha ara');
        console.log(localStorage);
        if(localStorage.getItem('u-token')){
            console.log('yha bhi ara');
            const tempObj={
                username:localStorage.getItem('u-username'),
                email:localStorage.getItem('u-email'),
                mongo_id:localStorage.getItem('u-id')
            }
            setUser(tempObj);
            setCanDoInitialLoading(true);
            loadUserContacts();
            if(localStorage.getItem('c-username')){
                initialSetPresentlyChattingWith();
            }
        }else{
          navigate('/auth');
        }
    }catch(err){
        console.log(err);
    }
  },[setUser,setCanDoInitialLoading,setContacts,setPresentlyChattingWith]);
  return (
    <div>
      {
        showContactsNotChats
        ?
        <ContactsMsgBox/>
        :
        <ChatBox/>
      }
    </div>
  )
}

export default MobileMain
