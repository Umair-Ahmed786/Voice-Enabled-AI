import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import First_component from './components/First_component';
import Nave from './components/Nave';
import ObjectDetection from './components/ObjectDetection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { useRef, useState } from 'react';


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
  return (
    <>

      <Router>
        <Nave />
        <Routes> {/* Use Routes instead of Route */}
          {/* <Route path="/" element={<First_component inputValue={inputValue} setInputValue={setInputValue} />} /> Wrap Route in Routes and use 'element' prop */}
          {/* <Route path="/home" element={<First_component />} /> Wrap Route in Routes and use 'element' prop */}
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
          <Route path="/detection" element={<ObjectDetection
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
          />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>


    </>
  );
}

export default App;
