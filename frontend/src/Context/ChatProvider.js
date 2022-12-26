import {createContext, useContext, useEffect} from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            //If user is not logged in you get redirected to the login page
            history.push('/');
        }
    },[history]);
    //last line is so that whenever history changes the code will run again

    
    return (
        <ChatContext.Provider value={{user,setUser}}>{children}</ChatContext.Provider>
    )
};

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;