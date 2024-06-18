import React from 'react'
import './Message.css'

const Message = ({msg,time,isSender}) => {
  function convertToFormattedDate(isoString) {
    // Parse the ISO date string
    const date = new Date(isoString);
  
    // Extract the local hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Extract the day, month, and year
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() is zero-based
    let year = date.getFullYear() % 100; // get the last two digits of the year
  
    // Format hours, minutes, day, and month with leading zeros if necessary
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');
    year = year.toString().padStart(2, '0');
  
    // Combine the components into the desired format
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
  
    return formattedDate;
  }
  // console.log(isSender);
  return (
    <div className="msgRow" style={{justifyContent:(isSender===true)?'flex-end':'flex-start'}}>
      <div className='msgBox'>
        {msg}
        <div className="timeBox">
          {convertToFormattedDate(time)}
        </div>
      </div>
    </div>
  )
}

export default Message
