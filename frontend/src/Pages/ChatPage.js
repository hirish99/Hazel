import { Box, VStack, StackDivider, HStack, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react'
import '../chatstyle.css';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../ChatPageComponents/SideDrawer';
import ChatBox from '../ChatPageComponents/ChatBox';
import MyChats from '../ChatPageComponents/MyChats';
import SidebarWithHeader from './SidebarWithHeader';

import { useEffect } from 'react';
import {useHistory} from 'react-router';



const ChatPage = () => {
  const {user} = ChatState();

  return (
    <SidebarWithHeader >
    <div style={{width:'100%'}}>
      <HStack
      d='flex'
      justifyContent='space-between'
      w='100%'
      h='91.5vh'
      p='10px'
      >
      {user && <MyChats/>}
      {user && <ChatBox/>}
      </HStack>
      
    </div>
    </SidebarWithHeader>
    
  );
};

export default ChatPage
