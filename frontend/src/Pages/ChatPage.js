import axios from 'axios'
import React from 'react'
import { useEffect, useState} from 'react';


const ChatPage = () => {
  const [chats, setChats] = useState([]);

  /*
  const fetchChats= async () => {
    //You cannot directly call the API in the use effect so you 
    //create a new async function to use await.
    //We are utilizing the functions we wrote on the backend here:
    const data = await axios.get("/api/chat");
    //console.log(data)
    setChats(data)
    console.log(chats)
  }
  */

  useEffect(() => {
    axios.get('/api/chat')
    .then(res => setChats(res.data))
    .catch(err => console.log(err));
  }, [])
  
  return (
  <div>
    {chats.map((chat) => (
      <div key={chat._id}>{chat.chatName}</div>
    ))}
  </div>
  )
};

export default ChatPage
