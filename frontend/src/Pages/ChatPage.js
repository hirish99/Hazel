import { Box } from '@chakra-ui/react';
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
  const history = useHistory();

  useEffect(() => {
    // Update the document title using the browser API
        const user = JSON.parse(localStorage.getItem("emailInfo"));
        if (user) {
            if (user.registered)
            {
              //history.push('/chats');
            }
            else{
              history.push('/preferences');
            }
        }
    });


  
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
