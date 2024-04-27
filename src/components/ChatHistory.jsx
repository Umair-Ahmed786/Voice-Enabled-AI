import React from 'react';

function ChatHistory() {
  const messages = []; // Array of message objects [{ role: 'user' | 'bot', text: 'message text' }]

  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
