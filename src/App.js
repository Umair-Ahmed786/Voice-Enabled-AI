import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import First_component from './components/First_component';
import Nave from './components/Nave';
import ObjectDetection from './components/ObjectDetection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { useRef, useState } from 'react';
import Webcame1 from './components/Webcame1';
import Describe from './components/Describe';



function App() {

  // voice gpt/ First_component states
  const [inputValue, setInputValue] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [chatHistory, setChatHistory] = useState('');
  const [isloading, setisloading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isspeaking, setspeaking] = useState(false);
  const [speed, setspeed] = useState(4);
  // voice gpt/ First_component states Ended

  // Object detection states started
  const [objectCounts, setObjectCounts] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageurl, setimageurl] = useState(null)
  const [history, sethistory] = useState([])
  const [loading, setloading] = useState(false)
  const imgref = useRef();
  // Object detection states Ended

  // webcame started 
  //  const [objectCounts_webcame, setObjectCounts_webcame] = useState({});
  //   const [selectedFile_webcame, setSelectedFile_webcame] = useState(null);
  //   const [imageurl_webcame, setimageurl_webcame] = useState(null);
  //   const [history_webcame, sethistory_webcame] = useState([]);
  //   const [loading_webcame, setloading_webcame] = useState(false);
    // const webcamRef = useRef(null);
    // webcame ended
  return (
    <>

      <Router>
        <Nave />
        <Routes>

          {/* <Route path="/" element={<First_component */}
          {/* function to add 2 number */}
          <Route path="/" element={<First_component
            inputValue={inputValue}
            setInputValue={setInputValue}
            questions={questions}
            setQuestions={setQuestions}
            answers={answers}
            setAnswers={setAnswers}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            isloading={isloading}
            setisloading={setisloading}
            isListening={isListening}
            setIsListening={setIsListening}
            isspeaking={isspeaking}
            setspeaking={setspeaking}
            speed={speed}
            setspeed={setspeed} />}
          />
          <Route path="/home" element={<First_component
            inputValue={inputValue}
            setInputValue={setInputValue}
            questions={questions}
            setQuestions={setQuestions}
            answers={answers}
            setAnswers={setAnswers}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            isloading={isloading}
            setisloading={setisloading}
            isListening={isListening}
            setIsListening={setIsListening}
            isspeaking={isspeaking}
            setspeaking={setspeaking}
            speed={speed}
            setspeed={setspeed} />}
          />





          <Route
            path="/detection"
            element={
              <ObjectDetection
                objectCounts={objectCounts}
                setObjectCounts={setObjectCounts}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                imageurl={imageurl}
                setimageurl={setimageurl}
                history={history}
                sethistory={sethistory}
                loading={loading}
                setloading={setloading}
                imgref={imgref}
              />
            }
          />

<Route
  path="/webcame"
  element={
    <Webcame1
      // objectCounts_webcame={objectCounts_webcame}
      // setObjectCounts_webcame={setObjectCounts_webcame}
      // selectedFile_webcame={selectedFile_webcame}
      // setSelectedFile_webcame={setSelectedFile_webcame}
      // imageurl_webcame={imageurl_webcame}
      // setimageurl_webcame={setimageurl_webcame}
      // history_webcame={history_webcame}
      // sethistory_webcame={sethistory_webcame}
      // loading_webcame={loading_webcame}
      // setloading_webcame={setloading_webcame}
      // webcamRef={webcamRef} // Pass webcamRef as a prop
    />
  }
/>

<Route
  path="/image"
  element={
    <Describe
    />
  }
/>

        </Routes>
      </Router>


    </>
  );
}

export default App;
