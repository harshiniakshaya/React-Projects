import React, { useEffect } from 'react'
import { useState } from 'react';
import "../styles/AdviceApp.css"

export const AdviceApp = () => {
    const [advice, setAdvice] = useState("Please click button to get advice!");
    const [count,setCount] = useState(-1);

    async function getAdvice(){
        const res = await fetch("https://api.adviceslip.com/advice");
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        setAdvice(data.slip.advice);
        setCount((c)=>c+1);
    }

    useEffect(function(){
        getAdvice();
    },[]);

  return (
    <div>
        <h3>{advice}</h3>
        <button onClick={getAdvice}>Get Advice</button>
        <Counter count={count} />
    </div>
  )
}

function Counter(props){
    return(
        <p>
            You have read <b>{props.count}</b> pieces of advice!
        </p>
    )
}
