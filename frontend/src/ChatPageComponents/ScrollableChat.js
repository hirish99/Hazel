import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({messages}) => {

    const {user} = ChatState();

    const isSameSender = (messages, m, i, userId) => {
        return (
            i < messages.length - 1 &&
            (messages[i+1].sender._id !== m.sender._id ||
            messages[i+1].sender._id === undefined) && 
            messages[i].sender._id !== userId
        );
    };

    const aloneMessage = (messages, m, i, userId) => {
        //console.log(messages[i],m,i)

        if (i > 0  && i < messages.length - 1)
        {
            return ((messages[i+1].sender._id === userId) &&
            (messages[i].sender._id === m.sender._id) && 
            (messages[i-1].sender._id === userId))
        }
        if (i === 0)
        {
            return (messages[i+1].sender._id === userId) &&
            (messages[i].sender._id === m.sender._id)
        }
        else {
            return ((messages[i].sender._id === m.sender._id) && 
            (messages[i-1].sender._id === userId))
        }
            

    };

    const isLastMessage = (messages, i, userId) => {
        return (
            i === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId && 
            messages[messages.length - 1].sender._id
        );
    };

    const isSameSenderMargin = (messages, m, i, userId) => {
        // //console.log(i === messages.length - 1);
      
        if (
          i < messages.length - 1 &&
          messages[i + 1].sender._id === m.sender._id &&
          messages[i].sender._id !== userId
        )
          return 33;
        else if (
          (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
          (i === messages.length - 1 && messages[i].sender._id !== userId)
        )
          return 0;
        else return "auto";
    };

    const isSameUser = (messages, m, i) => {
        return i > 0 && messages[i - 1].sender._id === m.sender._id;
    };

    return (
    <div>
        {messages && messages.map((m, i) => (
            <div style={{display:"flex"}} key={m._id}>
                {
                (isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id))
                && (
                    <Tooltip label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                    >
                        <Avatar
                            mt="3px"
                            mr={1}
                            size="sm"
                            cursor="pointer"
                            name={m.sender.name}
                            src={m.sender.pic}
                        >
                        </Avatar>

                    </Tooltip>
                )
                }
                <span
                style={{
                    backgroundColor: `${
                        m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: 5,
                }}
                >
                {m.content}
                </span>
            </div>

            
        ))}
    </div>
  )
}

export default ScrollableChat
