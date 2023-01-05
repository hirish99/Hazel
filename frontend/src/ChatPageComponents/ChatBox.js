import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, VStack, Flex, HStack, Center } from '@chakra-ui/react';

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
      <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      d="flex"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Center>Chat</Center>



      </Box>
      
    </Flex>
  )
}

export default ChatBox
