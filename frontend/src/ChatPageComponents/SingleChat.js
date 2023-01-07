import {React, useState, initialState} from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Center, Text, VStack } from '@chakra-ui/react';



const SingleChat = () => {
  const {selectedChat, user, setSelectedChat} =  ChatState();

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(initialState)




  return (
    <div>
            {JSON.stringify(selectedChat)}
    </div>
  )
}

export default SingleChat
