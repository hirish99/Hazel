import { Box, VStack, StackDivider, HStack, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react'
import '../chatstyle.css';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../ChatPageComponents/SideDrawer';
import ChatBox from '../ChatPageComponents/ChatBox';
import MyChats from '../ChatPageComponents/MyChats';

import { useEffect } from 'react';
import {useHistory} from 'react-router';



const ChatPage = () => {
  const {user} = ChatState();
  
  return (
    <span class="chatstyle">
    <div style={{width:'100%'}}>
      {user && <SideDrawer />}
      <Box
      d='flex'
      justifyContent='space-between'
      w='100%'
      h='91.5vh'
      p='10px'
      >
        {user && <MyChats/>}
      </Box>
    </div>
    </span>
    
  );
};

export default ChatPage
