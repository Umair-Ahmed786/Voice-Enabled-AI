import React, { useState } from 'react';

const ChatInput = () => {
//   const [transcript, setTranscript] = useState('');
//   const [isListening, setIsListening] = useState(false);

//   const recognition = new window.webkitSpeechRecognition();

//   recognition.onstart = () => {
//     console.log('Voice recognition started');
//     setIsListening(true);
//   };

//   recognition.onresult = (event) => {
//     const currentTranscript = event.results[0][0].transcript;
//     setTranscript(currentTranscript);
//     console.log(transcript)
//   };

//   recognition.onend = () => {
//     console.log('Voice recognition stopped');
//     setIsListening(false);
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   return (
//     <div>
//       <h2>Voice to Text</h2>
//       <button onClick={toggleListening}>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <p>{transcript}</p>
//     </div>
//   );

// Create a new instance of SpeechSynthesisUtterance
const msg = new SpeechSynthesisUtterance();

// Set the text that you want to convert to speech
msg.text = "Hello, world!";

// Set optional parameters, such as language and rate
msg.lang = "en-US"; // Specify the language (default is the user's browser language)
msg.rate = 1.0; // Set the rate of speech (1.0 is the default rate)

// Use the SpeechSynthesis API to speak the text
window.speechSynthesis.speak(msg);

};

export default ChatInput;
