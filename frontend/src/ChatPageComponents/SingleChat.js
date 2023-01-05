import React from 'react'
import { ChatState } from '../Context/ChatProvider'



const SingleChat = () => {
  const {selectedChat} =  ChatState();
  return (
    <div>
        {!selectedChat? ("Hello"):(
            JSON.stringify(selectedChat))
        }   
        
    </div>
  )
}

export default SingleChat
