import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from './socketTypes';

const socket: Socket<SocketEvents> = io(`http://localhost:8000`);

function App() {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState(['']);

  useEffect(() => {
    socket.on('chatMessage', (msgReceived: string) => {
      setChatMessages((chatMsg) => [...chatMsg, msgReceived]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const handleMsgInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sendMsg = () => {
    socket.emit('chatMessage', input);
    setInput('');
  };

  return (
    <div className="App">
      <input onChange={handleMsgInput} value={input}></input>
      <button onClick={sendMsg}>Send</button>
      {chatMessages.map((msg) => (
        <div>{msg}</div>
      ))}
    </div>
  );
}

export default App;
