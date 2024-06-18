import React, { useState,createContext, useEffect } from 'react'
import io from 'socket.io-client'

const contextData=createContext();

const AllStates = (props) => {
    
    // const backendLink='http://localhost:5000';
    const backendLink='https://chattapp-backend-1zr6.onrender.com';
    const socket=io.connect(backendLink);
    const [user, setUser]=useState({username:'', email:'', mongo_id:''});
    const [contacts,setContacts]=useState([]);
    const [canDoInitialLoading,setCanDoInitialLoading]=useState(false);
    const [presentlyChattingWith,setPresentlyChattingWith]=useState({username:'', email:'', mongo_id:''});
    const [showContactsNotChats,setShowContactsNotChats]=useState(true);
    return (
        <contextData.Provider value={{backendLink, user, setUser,contacts,setContacts,presentlyChattingWith,setPresentlyChattingWith,canDoInitialLoading,setCanDoInitialLoading,socket,showContactsNotChats,setShowContactsNotChats}}>
            {props.children}
        </contextData.Provider>
    )
}

export default AllStates
export {contextData}
