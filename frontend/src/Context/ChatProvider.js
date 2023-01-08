import {createContext, useContext, useEffect} from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [selectedChat, setSelectedChat]= useState();
    const [chats, setChats] = useState([]);

    const possibleinterests = [
        { value: "Bicycling", label: "Bicycling" },
        { value: "Workingout", label: "Working Out" },
        { value: "Dancing", label: "Dancing" },
        { value: "Videogames", label: "Video Games" },
        { value: "Anime", label: "Anime" },
        { value: "Partying", label: "Partying" },
        { value: "Surfing", label: "Surfing" },
        { value: "Painting", label: "Painting" },
        { value: "Hiking", label: "Hiking" },
        { value: "Martial Arts", label: "Martial Arts" },
        { value: "Photography", label: "Photography" },
        { value: "Physics", label: "Physics" },
        { value: "Math", label: "Math" },
        { value: "Finance", label: "Finance" },
        { value: "Entrepreneurship", label: "Entrepreneurship" },
        { value: "Music", label: "Music" },
        { value: "Baking", label: "Baking" },
        { value: "Grilling", label: "Grilling" },
        { value: "Soccer", label: "Soccer" },
        { value: "Instrument", label: "Instrument (ex. Piano)" },
        { value: "Coffee", label: "Coffee" },
      ];

      const possibleProjects = [
        { value: "Finance", label: "Finance" },
        { value: "Politics", label: "Politics" },
        { value: "Diseasemodeling", label: "Disease Modeling" },
        { value: "Nlp", label: "Natural Language Processing" },
        { value: "Computervision", label: "Computer Vision" },
        { value: "Recommendationsystem", label: "Recommendation System" },
        { value: "Food", label: "Food" },
        { value: "Buisness", label: "Buisnesses" },
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
        { value: "Social Media", label: "Social Media" },
        { value: "Enviorment", label: "Enviroment" },
        { value: "Other", label: "Other"},
      ];

      const possibleSkills = [
        { value: "Python", label: "Python" },
        { value: "Rensorflow", label: "TensorFlow" },
        { value: "PyTorch", label: "PyTorch" },
        { value: "Pandas", label: "Pandas" },
        { value: "Numpy", label: "Numpy" },
        { value: "scikit-learn", label: "scikit-learn" },
        { value: "R", label: "R" },
        { value: "SQL", label: "SQL" },
        { value: "C++", label: "C++" },
      ];



    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo && history) {
            //If user is not logged in you get redirected to the login page
            history.push('/');
        }
    },[history]);
    //last line is so that whenever history changes the code will run again

    
    return (
        <ChatContext.Provider value={{possibleinterests,possibleProjects,possibleSkills, user,setUser,email,setEmail,selectedChat,setSelectedChat,chats,setChats}}>{children}</ChatContext.Provider>
    )
};

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;