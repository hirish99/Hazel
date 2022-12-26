import { Box } from '@chakra-ui/react';
import React from 'react'
import '../chatstyle.css';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../ChatPageComponents/SideDrawer';
import ChatBox from '../ChatPageComponents/ChatBox';
import MyChats from '../ChatPageComponents/MyChats';



const ChatPage = () => {
  const {user} = ChatState();


  
  return (
    <span className="homestyle"> 
    <div style={{width:"100%"}}>
      { user && <SideDrawer/>}
  

    <Box>
      {user && <MyChats/>}
      {user && <ChatBox/>}
    </Box>
    </div>
    </span>
  );
};

export default ChatPage
