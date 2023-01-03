import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react'
import {ChatState} from "../Context/ChatProvider";


const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState();

  const toats = useToast();

  return (
    <div>
      MyChats
    </div>
  )
}

export default MyChats
