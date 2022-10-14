import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIO from 'socket.io-client';

const socket = socketIO.connect(`http://localhost:8000`);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendPing = () => {
    socket.emit('chat message', 'it works');
  };

  return (
    <div className="App">
      <header className="App-header">
        {isConnected ? <div>CONNECTED</div> : <div>Not Connected</div>}
        <button onClick={sendPing}>send ping</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
