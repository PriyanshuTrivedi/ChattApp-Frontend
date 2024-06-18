import React, { useContext, useState } from 'react'
import axios from 'axios'
import { contextData } from '../../AllStates'
import './SearchBox.css'
import search from './search.png'
import cross from './cross.png'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [contactToSearch,setContactToSearch]=useState('');
    const context=useContext(contextData);
    const {backendLink,contacts,setContacts,setUser,setPresentlyChattingWith}=context;
    const [searched,setSearched]=useState(false);
    const navigate=useNavigate();

    const handleSearchOrCancel=async ()=>{
        if(!searched){
            const url=`${backendLink}/auth/searchUser`;
            const payload={
                searchParam:contactToSearch,
                userEmail:localStorage.getItem('u-email')
            };
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
                console.log('y h seachedUsers k result->');
                console.log(res);
                setContacts(res.data);
                setSearched(true);
            }catch(err){
                console.log('search krne m dikkt ari->');
                console.log(err);
            }
        }else{
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
            setContactToSearch('');
            setSearched(false);
        }
    }
    return (
        <div className='searchBox'>
            <input className='contactSearchText' type="text" value={contactToSearch} onChange={(e)=>setContactToSearch(e.target.value)} placeholder='Search Users...'/>
            <div onClick={handleSearchOrCancel} className='searchImgBox'>
                <img src={searched?cross:search} className='searchImg' />
            </div>
        </div>
    )
}

export default SearchBox
