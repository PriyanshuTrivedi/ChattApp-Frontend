import React, { useContext, useEffect, useState } from 'react'
import { contextData } from '../../AllStates'
import Message from '../Message/Message';
import axios from 'axios';
import './ChatBox.css'
import sendImg from './sendIcon.png'
import BackBtn from '../Back/BackBtn'
import { useNavigate } from 'react-router-dom';

const ChatBox = () => {
    const context=useContext(contextData);
    const {backendLink,user,presentlyChattingWith,setPresentlyChattingWith,canDoInitialLoading,setCanDoInitialLoading,socket,contacts,setContacts,showContactsNotChats,setShowContactsNotChats,setUser}=context;
    const navigate=useNavigate();

    const [messages,setMessages]=useState([]);
    const [textToSend,setTextToSend]=useState("");

    let room=`${user.email}_${presentlyChattingWith.email}`;
    if(presentlyChattingWith.email<user.email){
        room=`${presentlyChattingWith.email}_${user.email}`;
    }
    useEffect(()=>{
        socket.emit('join_room',room);
    },[socket]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(()=>{
        const initialChatFetch=async()=>{
            const payload={
                user1:user.email,
                user2:presentlyChattingWith.email
            }
            console.log(payload);
            const url=`${backendLink}/msg/chat`;
            try{
                const res=await axios.post(url,payload,{headers:{Authorization:`Bearer ${localStorage.getItem('u-token')}`}});
                if(res.status===403){
                    localStorage.clear();
                    console.log(localStorage);
                    const emptyInfo={username:'', email:'', mongo_id:''};
                    setUser(emptyInfo);
                    setPresentlyChattingWith(emptyInfo);
                    navigate('/auth');
                }
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        }
        console.log('kkkkk');
        if(canDoInitialLoading===true){
            initialChatFetch();
            setCanDoInitialLoading(false);
        }
    },[setMessages,canDoInitialLoading,setCanDoInitialLoading,presentlyChattingWith,setPresentlyChattingWith]);

    useEffect(()=>{
        console.log('mesage socket k through ara');
        const addMsgsAndUpdateNewMsg=(data)=>{
            setMessages(prevMessages => [...prevMessages, JSON.parse(data)]);
            const updatedNewMsg=contacts.map((el)=>{
                if(el.contact.email===presentlyChattingWith.email){
                    return {
                        contact:el.contact,
                        lastMessage:JSON.parse(data)
                    };
                }else{
                    return el;
                }
            });
            setContacts(updatedNewMsg);
        }
        socket.on('receive_msg',addMsgsAndUpdateNewMsg);

        return ()=>{
            socket.off('receive_msg',addMsgsAndUpdateNewMsg);
        }
    },[socket,setMessages,setContacts]);

    const sendMsg=async ()=>{
        const payload={
            senderEmail:user.email,
            receiverEmail:presentlyChattingWith.email,
            msg:textToSend
        };
        const url=`${backendLink}/msg`;
        try{
            const res=await axios.post(url,payload,{headers:{Authorization:`Bearer ${localStorage.getItem('u-token')}`}});
            if(res.status===403){
                localStorage.clear();
                console.log(localStorage);
                const emptyInfo={username:'', email:'', mongo_id:''};
                setUser(emptyInfo);
                setPresentlyChattingWith(emptyInfo);
                navigate('/auth');
            }
            console.log(res.data);
            socket.emit('send_msg',JSON.stringify(res.data));
            const updatedNewMsg=[];
            for(const contactInfo of contacts){
                if(contactInfo.contact.email===presentlyChattingWith.email){
                    updatedNewMsg.push({
                        contact:contactInfo.contact,
                        lastMessage:res.data
                    });
                }
            }
            for(const contactInfo of contacts){
                if(contactInfo.contact.email===presentlyChattingWith.email){
                    continue;
                }
                updatedNewMsg.push(contactInfo);
            }
            setContacts(updatedNewMsg);
            // socket.to(room).emit('send_msg',JSON.stringify(res.data));
            setMessages(prevMessages => [...prevMessages, res.data]);
            setTextToSend('');
            // setCanDoInitialLoading(true);
        }catch(err){
            console.log(err);
        }
    }
    const scrollToBottom=()=>{
        const scrollableDiv=document.getElementById('style-2');
        scrollableDiv.scrollTop=scrollableDiv.scrollHeight;
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('key to dbri');
            event.preventDefault(); // Prevents the default behavior of Enter key (like form submission)
            sendMsg();
        }
    };
    return (
        <div className='chatArea'>
            <div className="user2Name">
                <div className="name">
                    {presentlyChattingWith.username}
                </div>
                {
                    window.innerWidth<1050
                    ?
                    <BackBtn/>
                    :
                    <></>
                }
            </div>
            <div className="chats" id="style-2">
                {
                    messages.map((element,index)=>{
                        return <Message msg={element.msg} time={element.createdAt} isSender={element.senderEmail===user.email?true:false}/>
                    })
                }
            </div>
            <div className="sendMsgTextArea">
                <input className='sendtextBox' value={textToSend} onChange={(e)=>(setTextToSend(e.target.value))}  onKeyDown={handleKeyDown} placeholder='Type a message'></input>
                <div className="imgBox" onClick={sendMsg}>
                    <img src={sendImg} className='sendImg' />
                </div>
            </div>
        </div>
    )
}

export default ChatBox
