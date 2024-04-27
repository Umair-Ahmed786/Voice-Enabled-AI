
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import text_load from '../images/text_load.gif'
import cohere from '../images/cohere.png'
import user from '../images/user.png'
import mic from '../images/mic1.png'
import stopmic from '../images/stopmic.png'
import say from '../images/say.png'
import dontsay from '../images/dont_say.png'
const { CohereClient } = require('cohere-ai');
// import Form from 'react-bootstrap/Form';
const recognition = new window.webkitSpeechRecognition();


function First_component() {
  const [inputValue, setInputValue] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [chatHistory, setChatHistory] = useState('');
  const [isloading, setisloading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isspeaking, setspeaking] = useState(false);
  const [speed, setspeed] = useState(4);

  const handleSubmit = async () => {

    setisloading(true)

    if (inputValue) {
      console.log('Submitted:', inputValue);
      const text = inputValue + " Answer in summarize way up to 2 or 3 lines";
      // setInputValue('');

      const cohere = new CohereClient({ token: "zboQMKIETkINYPB0Pr1rjqCd1etSu4ntOJIkskYv" });

      const generate = await cohere.generate({
        // prompt: "you previously answered these quesions"+chatHistory+"this is my current promt asnwer only this in summarize way up to 2 or 3 lines: "+text,
        prompt: text
      });

      const generatedAnswer = generate.generations[0].text;
      console.log(generatedAnswer);
      // const newchathistory = newchathistory+text+". "; 
      setChatHistory(chatHistory + text);
      console.log("after input value is empty", inputValue)
      setQuestions([...questions, inputValue]);
      setAnswers([...answers, generatedAnswer]);
      setisloading(false);
      setInputValue('');
    } else {
      console.log("No input received");
      setisloading(false);
    }

  };


  recognition.onstart = () => {
    console.log('Voice recognition started');

    setIsListening(true);
  };

  recognition.onresult = (event) => {
    console.log("inside on result")
    const currentTranscript = event.results[0][0].transcript;
    setInputValue(currentTranscript);
    console.log(inputValue)
  };

  recognition.onend = () => {
    console.log('Voice recognition stopped');
    setIsListening(false);
    // if (inputValue.trim() !== '') {
    handleSubmit(); // Call handleSubmit if there is input when recognition ends
    // }
  };

  const toggleListening = () => {
    if (isListening) {
      console.log("mic ended clicked")
      recognition.stop();

    } else {
      console.log("mic started clicked")
      recognition.start();
    }
  };


  useEffect(() => {

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance();
      msg.text = answers[answers.length - 1];

      // Set optional parameters, such as language and rate
      msg.lang = "en-US"; // Specify the language (default is the user's browser language)
      msg.rate = speed; // Set the rate of speech (1.0 is the default rate)


      // Use the SpeechSynthesis API to speak the text
      window.speechSynthesis.speak(msg);

      msg.onend = () => {
        setspeaking(false); // Set isspeaking to false after speech is completed
      };
      // Stop speaking
      // window.speechSynthesis.cancel();
    }

  }, [speed]);

  const togglespeaking = () => {
    if (isspeaking) {
      setspeaking(false)
      // Check if speech synthesis is currently speaking
      if (window.speechSynthesis.speaking) {
        // Stop speaking
        window.speechSynthesis.cancel();
      }
    }
    else {
      if (answers.length) {

        setspeaking(true)
        // Create a new instance of SpeechSynthesisUtterance
        const msg = new SpeechSynthesisUtterance();
        msg.text = answers[answers.length - 1];

        // Set optional parameters, such as language and rate
        msg.lang = "en-US"; // Specify the language (default is the user's browser language)
        msg.rate = speed; // Set the rate of speech (1.0 is the default rate)


        // Use the SpeechSynthesis API to speak the text
        window.speechSynthesis.speak(msg);

        msg.onend = () => {
          setspeaking(false); // Set isspeaking to false after speech is completed
        };
      }
    }
  };





  return (
    <>
      <div
        className="container"
        style={{
          display: 'flex',
          // justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          // border: '2px solid black',
        }}
      >

        {/* 1st row started */}
        <div className="row">

          {/* 1st col */}
          <div className="col col-lg-4 col-md-4 col-sm-4 " style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <label htmlFor="range" > <b>Speed:</b> {speed} <br />
              <input type="range" id='range' value={speed} onChange={(e) => setspeed(e.target.value)} min={0} max={8} style={{ width: '100%', border: '2px solid red' }} />
            </label>
          </div>

          {/* 2nd col */}
          <div className="col col-lg-4 col-md-4 col-sm-4">

            <h3
              className="pt-5 pb-5"
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bolder',
                // border: '2px solid black',
                margintop: '0'
              }}
            >
              Welcome to Voice GPT

              {/* speak button started */}
            </h3>
          </div>

          {/* 3rd col */}
          <div className="col col-lg-4 col-md-4 col-sm-4 " style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>

            <img className={`btn btn-sm ${isspeaking ? 'btn-primary' : 'btn-danger'}`} onClick={togglespeaking} src={isspeaking ? say : dontsay} alt="Mic" style={{ marginBottom: '0.8rem', height: '3rem', border: '2px solid black' }} />

          </div>
        </div>
        {/* 1st row ended        */}



        {/* second Question answer row started */}
        <div className="row">

          <div
            className="response mt-2 mb-4 px-4"
            style={{
              backgroundColor: 'honeydew',
              // border: '2px solid black',
            }}
          >
            <h4 className='pb-4'>Your Responses:</h4>
            {questions.map((question, index) => (
              <div key={index}>
                <p style={{ textAlign: 'justify' }}> <img src={user} alt="cohere" style={{ height: '2rem' }} /> <b>You:</b> <div style={{ paddingLeft: '2.3rem', textAlign: 'justify' }}> {question}</div></p>
                {answers[index] && <p className='' style={{ marginBottom: '5rem' }}> <b><img src={cohere} alt="cohere" style={{ height: '2rem' }} />Voice-GPT:</b> <div style={{ paddingLeft: '2.2rem', textAlign: 'justify' }}>{answers[index]}</div> </p>}
              </div>
            ))}

            <div>

              {/* {isloading && <img src={text_load} style={{ width: '20rem', marginBottom: '5rem', width: '5rem' }} alt="loading" />} */}

              {isloading && <div>
                <p style={{ textAlign: 'justify' }}> <img src={user} alt="cohere" style={{ height: '2rem' }} /> <b>You:</b> <div style={{ paddingLeft: '2.3rem', textAlign: 'justify' }}> <p></p>{inputValue}</div></p>
                {<p style={{ marginBottom: '5rem' }}> <b><img src={cohere} alt="cohere" style={{ height: '2rem' }} />Voice-GPT:</b> <div style={{ paddingLeft: '2.2rem', textAlign: 'justify' }}><img src={text_load} style={{ width: '20rem', marginBottom: '5rem', width: '5rem' }} alt="loading" /></div> </p>}
              </div>}

            </div>


          </div>
        </div>



        {/* 3rd row */}
        {/* input field */}
        <div
          className=""
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            bottom: '0',
            width: '80%',
            // border: '2px solid black',
            padding: '1rem',
            boxSizing: 'border-box',
            margintop: '50em',
            // marginBottom: '200%'
          }}
        >
          <input
            className=''
            disabled={isloading}
            type="text"
            placeholder='Promt here: '
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              height: '3rem',
              width: '80%',
              borderRadius: '10px 0 0 10px ',
              border: '1px solid #ced4da', // Add a default border
              boxShadow: '0 0 0 1px #ced4da, 0 0 0 3px transparent',
            }}
          />


          {/* Mic button started */}
          <button
            style={{ border: 'none', left: '53.3rem', height: '3rem', backgroundColor: 'white' }}
            disabled={isloading}
            onClick={toggleListening}
          >
            <img src={isListening ? stopmic : mic} alt="Mic" style={{ height: '3rem', textAlign: 'center', padding: '0', margin: '0' }} />
          </button>
          {/* mic button ended */}

          {/* submit button */}
          <button
            style={{
              height: '3rem',
              width: '80px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '0 10px 10px 0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            disabled={isloading}
            onClick={handleSubmit}
          >
            Submit
          </button>

          {/* button ended */}

        </div>
        {/* 3rd row ended */}

      </div>


    </>
  );
}

export default First_component;

