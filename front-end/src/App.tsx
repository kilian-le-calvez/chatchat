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
    if (input === '') return;
    socket.emit('sendChat', input);
    setInput('');
  };

  return (
    <Flex bg="brand.300" h="100vh" alignItems="center" justifyContent="center">
      <Box bg="brand.500" w="400px" borderRadius="10px" boxShadow="2xl">
        <Flex
          h="600px"
          bg="brand.500"
          borderTopRadius="10px"
          padding={3}
          overflow="hidden"
          flexDirection="column-reverse"
        >
          {chatMessages.map((chat) => (
            <Flex mb="1rem" alignSelf={chat.userId === socket.id ? 'flex-end' : 'flex-start'}>
              {chat.userId === socket.id ? (
                <Box bg="brand.300" borderRadius="2xl" ml="100px" p="10px" width="fit-content">
                  {chat.msg}
                </Box>
              ) : (
                <Box bg="brand.700" borderRadius="2xl" mr="100px" p="10px">
                  {chat.msg}
                </Box>
              )}
            </Flex>
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
