import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { SocketEventsToClient, SocketEventsToServer } from './socketTypes';
import { Box, Button, Flex, FormControl, Input } from '@chakra-ui/react';

const socket: Socket<SocketEventsToClient, SocketEventsToServer> = io(`http://localhost:8000`);

type Message = {
  userId: string;
  msg: string;
};

function App() {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('receiveChat', (userId: string, msg: string) => {
      setChatMessages((chatMsg) => [{ userId, msg }, ...chatMsg]);
    });

    return () => {
      socket.off('receiveChat');
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
    socket.emit('sendChat', input);
    setInput('');
  };

  return (
    <Flex bg="brand.300" h="100vh" alignItems="center" justifyContent="center">
      <Box bg="brand.500" w="400px" borderRadius="10px">
        <Flex h="600px" bg="brand.500" borderTopRadius="10px" padding={3} overflow="hidden" direction="column-reverse">
          {chatMessages.map((msg) => (
            <div>
              {msg.userId} : {msg.msg}
            </div>
          ))}
        </Flex>
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
