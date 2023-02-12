import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Chat.css';

const firebaseConfig = {
    apiKey: "AIzaSyBcl5RR3JKS7Q1XUh8iwRsBABW4IR1jYl8",
    authDomain: "multilingual-chat-55415.firebaseapp.com",
    projectId: "multilingual-chat-55415",
    storageBucket: "multilingual-chat-55415.appspot.com",
    messagingSenderId: "568999670385",
    appId: "1:568999670385:web:c9285d909db017bc07a1d0",
    measurementId: "G-5C77E95FYL"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    database.ref('messages').on('value', (snapshot) => {
      setMessages(snapshot.val());
    });
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    database.ref('messages').push({
      message: newMessage,
      language: selectedLanguage,
      timestamp: Date.now(),
    });
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h2>WhatsApp Clone</h2>
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>
      <div className="message-container">
        {messages.map((message) => (
          <div className="message" key={message.timestamp}>
            <p className="message-text">{message.message}</p>
            <p className="message-language">{message.language}</p>
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
