import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import First_component from './components/First_component';
import Nave from './components/Nave';
import ObjectDetection from './components/ObjectDetection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes




function App() {
  return (
    <>
     
     <Router>
      <Nave/>
      <Routes> {/* Use Routes instead of Route */}
        <Route path="/" element={<First_component />} /> {/* Wrap Route in Routes and use 'element' prop */}
        <Route path="/home" element={<First_component />} /> {/* Wrap Route in Routes and use 'element' prop */}
        <Route path="/detection" element={<ObjectDetection/>} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
    

    </>
  );
}

export default App;
