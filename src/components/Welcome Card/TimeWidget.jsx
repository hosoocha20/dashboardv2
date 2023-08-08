import React, { useState, useEffect } from 'react'
import axios from 'axios';
import welcomeSVG from '../../icons/undraw_new_year_2023_pfnc.svg'

const TimeWidget = () => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [date, setDate] = useState(new Date());
    const [qOD, setQOD] = useState({});

    const time= date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    const fetchQOD = async() =>{
        try{
            const quote = await axios.get('https://officeapi.akashrajpurohit.com/quote/random');
            
            const quoteData = await quote.data;
            setQOD(quoteData);
        } catch(err){
            console.log(err);
        }
    }

    //Set interval to reset timer for live time
    useEffect(()=>{
        fetchQOD();
        let secTimer = setInterval( () =>{
            setDate(new Date())
        }, 1000)
        return () => clearInterval(secTimer);
        
    }, [])

    const getMessage = (d)=> {
        let message= ""
        if (d.getHours() < 12 && d.getHours()>=5){
            message = "Good Morning"
        }
        else if (d.getHours() >=12 && d.getHours()<18){
            message = "Good Afternoon"
        }
        else{
            message = "Good Evening"
        }
        return message
    }



 

  return (
    <div className='showDateTime'>
        <div className="time-day-container">
            <h1> {time} </h1>
            <h3>{weekday[date.getDay()]}, { month[date.getMonth()]} {date.getDate()}</h3>
        </div>
        <div className="welcomeIcon">
            <img src={welcomeSVG} alt="2023 SVG" id="welcomeSVG"/>
        </div>
        <h2>{getMessage(date)}</h2>
        <div className="qod-container">
            <div className='qod-quote'>{'"'+ qOD.quote+'"'}</div>
            <div className='qod-author'>{'- '+qOD.character}</div>
        </div>


    </div>
  )
}

export default TimeWidget