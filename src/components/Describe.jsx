import React, { useRef, useState, useEffect } from 'react';
import text_load from '../images/text_load.gif'
import cohere from '../images/cohere.png'
import user from '../images/user.png'
import Image from 'react-bootstrap/Image';

import { GoogleGenerativeAI } from "@google/generative-ai";
import Alert1 from './Alert1';

const API_KEY = 'AIzaSyB0xk0KsCqcaabJDj0ZmruhaGjThspH9Ck'; // Replace 'YOUR_API_KEY' with your actual API key

const genAI = new GoogleGenerativeAI(API_KEY);


function Describe() {
  const [history, sethistory] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [chatHistory, setChatHistory] = useState('');
  const [isloading, setisloading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isspeaking, setspeaking] = useState(false);
  const [showalert, setshowalert] = useState(false);
  const [loading, setloading] = useState(false)



  const [SelectedFile, setSelectedFile] = useState(false);
  const [imageurl, setimageurl] = useState(null);
  const [message, setmessage] = useState("");

  const imgref = useRef(null);

  //   const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     // setimageurl(file);
  //     setSelectedFile(file)
  //     if (file) {
  //       const url = URL.createObjectURL(file);
  //       setimageurl(url);
  //     }
  //   };

  //   const generate_url = (image) => {
  //     const url = URL.createObjectURL(image)
  //     return url
  // };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // setObjectCounts({})
    if (file) {
      // const url = URL.createObjectURL(file);
      setimageurl(generate_url(file));
      sethistory([file, ...history]);
    }
  };

  const generate_url = (image) => {
    const url = URL.createObjectURL(image)
    return url
  }


  const handleSubmit = async () => {
    setisloading(true)


    if (!SelectedFile) {
      setshowalert(true)
      console.error('Please upload an image before asking a question.');
      setmessage('Please upload an image before asking a question.');
      // alert("Please upload an image before asking a question.")

      setTimeout(() => {
        setshowalert(false)
      }, 3000);

      setisloading(false)
      setInputValue("")
      return;
    }

    setisloading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imagePart = await fileToGenerativePart(SelectedFile);
    const result = await model.generateContent([inputValue, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Add the question to the history
    setQuestions([...questions, inputValue]);
    setAnswers([...answers, text]);

    console.log('Question:', questions);
    console.log('Answer:', text);
    setisloading(false)
    setInputValue("");
  };

  const fileToGenerativePart = async (file) => {
    const data = await fileToBase64(file);
    return {
      inlineData: { data, mimeType: file.type },
    };
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
  };


  return (
    <>


      <div className="container-fluid">

        <div className="row">

          {/* col number 1 */}
          <div className="col col-lg-9 col-sm-12 col-md-8">

            <div
              className="container mt-5"
              style={{
                display: 'flex',
                // justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                marginTop: '5rem'
                // border: '2px solid black',
              }}
            >

              {showalert && (<Alert1 message={message} />
              )}
              {/* 1st row  */}
              <div className="row  my-3">
                <input type="file" onChange={handleFileChange} ref={imgref} style={{ height: 0, width: 0, visibility: 'hidden' }} />
                <div>

                  <button className='btn btn-lg btn-warning' disabled={isloading} onClick={() => imgref.current.click()}>Upload Image</button>
                </div>
              </div>


              {/* 2nd row  */}
              <div className="row my-5 text-center" style={{}}>
                <div className="col">
                  {
                    imageurl &&
                    <Image className='img-responsive img-fluid' style={{ backgroundColor: 'black' }} src={imageurl} alt="image" thumbnail />
                  }
                </div>

              </div>



              {/*3rd row print question and answers started */}
              <div className="row">

                <div
                  className="response mt-2 mb-4 px-4"
                  style={{
                    backgroundColor: 'honeydew',
                    // border: '2px solid black',
                  }}
                >
                  <h4 className='py-4'>Your Responses:</h4>
                  {questions.map((question, index) => (
                    <div key={index}>
                      <p style={{ textAlign: 'justify' }}> <img src={user} alt="cohere" style={{ height: '2rem' }} /> <b>You:</b> <div style={{ paddingLeft: '2.3rem', textAlign: 'justify' }}> {question}</div></p>
                      {answers[index] && <p className='' style={{ marginBottom: '5rem' }}> <b><img src={cohere} alt="cohere" style={{ height: '2rem' }} />AI:</b> <div style={{ paddingLeft: '2.2rem', textAlign: 'justify' }}>{answers[index]}</div> </p>}
                    </div>
                  ))}

                  <div>

                    {/* {isloading && <img src={text_load} style={{ width: '20rem', marginBottom: '5rem', width: '5rem' }} alt="loading" />} */}

                    {isloading && <div>
                      <p style={{ textAlign: 'justify' }}> <img src={user} alt="cohere" style={{ height: '2rem' }} /> <b>You:</b> <div style={{ paddingLeft: '2.3rem', textAlign: 'justify' }}> <p></p>{inputValue}</div></p>
                      {<p style={{ marginBottom: '5rem' }}> <b><img src={cohere} alt="cohere" style={{ height: '2rem' }} />AI:</b> <div style={{ paddingLeft: '2.2rem', textAlign: 'justify' }}><img src={text_load} style={{ width: '20rem', marginBottom: '5rem', width: '5rem' }} alt="loading" /></div> </p>}
                    </div>}

                  </div>


                </div>
              </div>
              {/* print question and answers ended */}



              {/*4rth row last input row started*/}
              <div
                className="mt-3"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'fixed',
                  bottom: '0',
                  width: '70%',
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
                  disabled={!inputValue || isloading}
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                {/* button ended */}

              </div>
              {/* last input row started*/}


             
            </div>
          </div>
          {/* col number 1 ended */}

          <div className="col col-lg-3 col-sm-12 col-md-4" style={{ background: 'rgb(39, 38, 38)'}}>
                     {/* history row started */}
             <div className="container pt-3">
               <h1 className='pt-5' style={{color: 'white'}}>Recent Images</h1>
             {history.length > 0 && (
                <div className='col mt-5' >
                  <div className='container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {history.map((image, index) => (
                      <div key={`${image}${index}`} style={{ width: '50%', boxSizing: 'border-box', padding: '5px'}}>
                        <img
                          src={generate_url(image)}
                          className='img-fluid'
                          alt="image"
                          style={{ width: '100%', height: '100%', border: '2px solid white' }}
                          disabled={loading}
                    
                          onClick={!loading ? () => { setimageurl(generate_url(image)); setSelectedFile(image) } : undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
             </div>

              {/* history row ended */}
          </div>

        </div>
      </div>
    </>
  )
}

export default Describe