import React from 'react';
import "../styles/DigitalClock.css"
import { useState } from 'react';
import { useEffect } from 'react';

export const DigitalClock = () => {
    const[currentTime,setCurrenTime]=useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrenTime(new Date())
        },1000); //for every 1000ms the function inside setInterval get called

        return ()=>clearInterval(timer);
    },[])
    
    const formatHour=(hour)=>{
        return hour==0?12:hour>12?hour-12:hour;
    }
    const formatTimeWithLeadingZero = (num) =>{
        return num<10? `0${num}`:num;
    }
    const formatDate=(date)=>{
        const options ={weekday:"long", year:"numeric",month:"long",day:"numeric"};
        return date.toLocaleDateString(undefined,options);
    }

  return (
    <>
        <div className='digital-clock'>
            <h1>Digital Clock</h1>
            <div className='time'>
                {formatTimeWithLeadingZero(formatHour(currentTime.getHours()))}: 
                {formatTimeWithLeadingZero(currentTime.getMinutes())}:
                {formatTimeWithLeadingZero(currentTime.getSeconds())} 
                {currentTime.getHours()>=12?" PM" : " AM"} 
            </div>
            <div className='date'>{formatDate(currentTime)}</div>
        </div>
    </>
  )
}
