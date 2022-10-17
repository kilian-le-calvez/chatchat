import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from './socketTypes';
import { Box, Button, Flex, FormControl, Input } from '@chakra-ui/react';

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      sendMsg();
    }
  };

  const sendMsg = () => {
    socket.emit('chatMessage', input);
    setInput('');
  };

  return (
    <Flex bg="brand.300" h="100vh" alignItems="center" justifyContent="center">
      <Box bg="brand.500" w="400px" borderRadius="10px">
        <Box h="600px" bg="brand.500" borderTopRadius="10px">
          {chatMessages.map((msg) => (
            <div>{msg}</div>
          ))}
        </Box>
        <FormControl
          onKeyDown={handleKeyDown}
          display="flex"
          bg="#eee"
          borderBottomLeftRadius="10"
          borderBottomRightRadius="10"
        >
          <Input onChange={handleMsgInput} value={input} borderRadius="0" borderBottomLeftRadius="10"></Input>
          <Button colorScheme="blue" onClick={sendMsg} borderRadius="0" borderBottomRightRadius="10">
            Send
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default App;
