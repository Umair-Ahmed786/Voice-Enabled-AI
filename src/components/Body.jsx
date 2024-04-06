import React, { useEffect, useState } from 'react'
// style={{ border: '2px solid red' }}

export default function Body() {

  const [expression, setexpression] = useState("");
  const [computed, setcomputed] = useState(1);
  const [result, setresult] = useState(0);

  const handleClick = (value) => {
    setcomputed(0);
    let str = expression;
    console.log("value is: " + value + " type of value is: " + typeof (value));
    str = str + value;
    setexpression(str);
  };

 
  const compute = () => {
    if (!expression) return;
    setcomputed(1);
    const express = expression;
    let numbers = [];
    let operators = [];

    console.log("before Expression is: ", express, "numbers are: ", numbers, "operators are: ", operators, "length is: ", express.length);

    let str = "";
    for (let i = 0; i < express.length; i++) {

      if (express[i] !== '+' && express[i] !== '-' && express[i] !== '*' && express[i] !== '/') {

        str = str + express[i];
        if (express[i + 1] === "+" || express[i + 1] === '-' || express[i + 1] === '*' || express[i + 1] === '/' || (i + 1) >= express.length) {

          numbers.push(parseInt(str));
          str = "";
        }
      }

      else {
        operators.push(express[i]);
      }
    }
    if(express[express.length-1] == '+' || express[express.length-1] == '-'){
      numbers.push(0);
    }

    else if(express[express.length-1] == '*' || express[express.length-1] == '/'){
      numbers.push(1);
    }
    console.log("After assigning number and operators:  Expression is: ", expression, "numbers are: ", numbers, "operators are: ", operators);




    let local_result = numbers[0]; //78

    for (let k = 0; k < operators.length; k++) {

      console.log("After Expression is: ", expression, "length of numbers are: ", numbers.length, "length of  operators are: ", operators.length);
      if (operators[k] === "+") {
        local_result = sum(local_result, numbers[k + 1]);
      }
      else if (operators[k] === "-") {
        local_result = sub(local_result, numbers[k + 1]);
      }
      else if (operators[k] === "*") {
        local_result = mul(local_result, numbers[k + 1]);
      }
      else if (operators[k] === "/") {
        local_result = div(local_result, numbers[k + 1]);
      }
    }

    setresult(local_result);
    setexpression(local_result);
  };

  // useEffect(() => {compute();},[expression]);


  const sum = (a, b) => {
    return a + b;
  };
  const sub = (a, b) => {
    return a - b;
  };
  const mul = (a, b) => {
    return a * b;
  };
  const div = (a, b) => {
    return a / b;
  };

  const handle_C = () => {
    setexpression("");
    setcomputed(1);
    setresult(0);
  };

  const handle_Backspace = () => {
    if(expression.length > 0){

      console.log("before backspace ", expression);
        setexpression(prevexpression => prevexpression.substring(0,prevexpression.length-1));
        setcomputed(0);
        console.log("before backspace ", expression, "length is: ",expression.length);
        if(!expression || expression.length == 1){
          setcomputed(1);
        }
    }
  }

  return (
    <>
      <div className="container-fluid py-5" style={{ backgroundColor: 'black' }}>

        <div className="container">

          {/* 0th row started */}
          <div className="row my-3" style={{ display: 'flex', justifyContent: 'center' }}>

            <div style={{ width: '35%', display: 'flex', color: 'white' }}>
              {/* <h1 >{expression.length >= 2 ? expression : "0"} </h1> */}
              <h1 >{computed == 1 ? "0" : expression} </h1>
            </div>
          </div>
          {/* 0th row ended */}


          {/* 0.5th row started */}
          <div className="row my-3" style={{ display: 'flex', justifyContent: 'center' }}>

            <div style={{ borderTop: '2px solid red', width: '35%', display: 'flex', color: 'white', justifyContent: 'right' }}>
              <h1 >{result}</h1>
            </div>
          </div>
          {/* 0.5th row ended */}

          {/* 1st row started */}
          <div className="row my-3">

            {/* <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid yellow' }}>
              <button className='btn btn-sm' onClick={handle_C} style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.2rem', marginRight: '10.5rem', marginLeft: '15.8rem' }}> <b>C</b></button>
              <button className='btn btn-sm'  style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.2rem', marginRight: '19.5rem' }}> <b>&lt;-</b></button>
            </div> */}

            <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>

            <button className='btn btn-sm' onClick={handle_C} style={{ marginLeft: '22.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>C</b></button>
              <button className='btn btn-sm' onClick={handle_Backspace}  style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '1.6rem', paddingRight: '1.6rem', fontSize: '1.5rem' }}> <b>&lt;-</b></button>
              {/* <button className='btn btn-sm' value="9" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b></b></button>
                <button className='btn btn-sm' value="/" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', marginRight: '1.5rem' , backgroundColor: 'orange', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b></b></button> */}
            </div>

          </div>
          {/* 1st row ended */}


          {/* 2nd row started */}
          <div className="row mt-2">

            <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <button className='btn btn-sm' value="7" onClick={(e) => handleClick(e.currentTarget.value)} style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>7</b></button>
              <button className='btn btn-sm' value="8" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>8</b></button>
              <button className='btn btn-sm' value="9" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>9</b></button>
              <button className='btn btn-sm' value="/" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'orange', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>/</b></button>
            </div>

          </div>
          {/* 2nd row ended */}


          {/* 3rd row started */}
          <div className="row mt-3">

            <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <button className='btn btn-sm' value="4" onClick={(e) => handleClick(e.currentTarget.value)} style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>4</b></button>
              <button className='btn btn-sm' value="5" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>5</b></button>
              <button className='btn btn-sm' value="6" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>6</b></button>
              <button className='btn btn-sm' value="*" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'orange', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>*</b></button>
            </div>
          </div>
          {/* 3rd row ended */}



          {/* 4rd row started */}
          <div className="row mt-3">

            <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <button className='btn btn-sm' value="1" onClick={(e) => handleClick(e.currentTarget.value)} style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>1</b></button>
              <button className='btn btn-sm' value="2" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>2</b></button>
              <button className='btn btn-sm' value="3" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>3</b></button>
              <button className='btn btn-sm' value="-" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'orange', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1rem' }}> <b>--</b></button>
            </div>
          </div>
          {/* 4rd row ended */}


          {/* 5th row started */}
          <div className="row my-3">

            <div className="col " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <button className='btn btn-sm' value="0" onClick={(e) => handleClick(e.currentTarget.value)} style={{ backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '5.3rem', paddingRight: '5.3rem', fontSize: '1.5rem' }}> <b>0</b></button>
              <button className='btn btn-sm' onClick={compute} style={{ marginLeft: '1.5rem', backgroundColor: 'gray', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1.5rem' }}> <b>=</b></button>
              <button className='btn btn-sm' value="+" onClick={(e) => handleClick(e.currentTarget.value)} style={{ marginLeft: '1.5rem', backgroundColor: 'orange', color: 'white', borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem', fontSize: '1rem' }}> <b>+</b></button>
            </div>
          </div>
          {/* 5th row ended */}




        </div>
      </div>
    </>
  )
}
