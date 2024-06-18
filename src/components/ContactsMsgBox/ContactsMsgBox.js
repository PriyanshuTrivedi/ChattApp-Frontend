import React, { useContext } from 'react'
import {contextData} from '../../AllStates'
import ContactMsg from '../ContactMsg/ContactMsg';
import SearchBox from '../SearchBox/SearchBox';
import './ContactsMsgBox.css'
import Logout from '../Logout/Logout';

const ContactsMsgBox = () => {
  const context=useContext(contextData);
  const {contacts,setContacts}=context;
  return (
    <div className='contactsMsgBox'>
      <Logout/>
      <SearchBox/>
      <div id="style-2_">
        {
          contacts?
          contacts.map((el,index)=>{
            return <ContactMsg contact={el.contact} lastMessage={el.lastMessage}/>
          })
          :
          <></>
        }
      </div>
    </div>
  )
}

export default ContactsMsgBox
