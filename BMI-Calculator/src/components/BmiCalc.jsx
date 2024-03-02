import React, { useState } from 'react';
import "../styles/BmiCalc.css";

export const BmiCalc = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const[bmi, setBmi] = useState(null);
    const[bmistatus,setBmiStatus] = useState("");
    const[errormsg, setErrorMsg] = useState(false);

    const calculateBmi = () =>{
        //regular expression
        const isValidHeight = /^\d+$/.test(height);
        const isValidWeight = /^\d+$/.test(weight);
        if(isValidHeight & isValidWeight){
            setErrorMsg(false);
            const heightm = height/100;
            const bmiValue = weight / (heightm*heightm);
            setBmi(bmiValue.toFixed(2));
            if(bmiValue<18.5){
                setBmiStatus("Under Weight");
            }
            else if (bmiValue >=18.5 && bmiValue <24.9){
                setBmiStatus("Normal Weight");
            }
            else if (bmiValue >=25 && bmiValue <29.9){
                setBmiStatus("OverWeight");
            }
            else{
                setBmiStatus("Obese");
            }
        }
        else{
            setBmi(null);
            setBmiStatus("");
            setErrorMsg(true);
        }
    }

    const clearValues = () =>{
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmiStatus("");
        setErrorMsg(false);
    }


  return (
    <>
        <div className='bmi-calculator'>
            <div className='box'>
                {/* <img src='images/bmi.jpg' /> */}
            </div>
            <div className='data'>
            <h1>BMI Calculator</h1>

            {errormsg && <p className='error'>Please enter valid numeric value for height and weight.</p>}

            <div className='input-container'>
                <label htmlFor='height'>Height (cm):</label>
                <input type="text" id="height" 
                    value={height}
                    onChange={(e)=>setHeight(e.target.value)}
                />
            </div>

            <div className='input-container'>
                <label htmlFor='weight'>Weight (kg):</label>
                <input type="text" id="weight" 
                    value={weight}
                    onChange={(e)=>setWeight(e.target.value)}
                />
            </div>

            <button onClick={calculateBmi}>Calculate BMI</button>
            <button onClick={clearValues} className='clear'>Clear</button>

            {bmi!==null && (<div className='result'>
                <p>Your BMI is: {bmi}</p>
                <p>Status: {bmistatus}</p>
            </div>)}
            </div>
        </div>
    </>
  )
}
