import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Center, Text, VStack } from '@chakra-ui/react';



const SingleChat = () => {
  const {selectedChat} =  ChatState();
  return (
    <div>
            {JSON.stringify(selectedChat)}
    </div>
  )
}

export default SingleChat
