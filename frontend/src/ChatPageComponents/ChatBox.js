import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, VStack, Flex, HStack, Center, Text } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = () => {
  const {selectedChat} = ChatState();

  return (
      <Flex
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "66%" }}
      borderRadius="lg"
      borderWidth="1px"
      h='100%'
    >
      <SingleChat></SingleChat>
      
    </Flex>
  )
}

export default ChatBox
