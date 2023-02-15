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
        { value: "Anime", label: "Anime" },
        { value: "Dancing", label: "Dancing" },
        { value: "Video Games", label: "Video Games" },
        { value: "Festivals", label: "Festivals" },
        { value: "Clubbing", label: "Clubbing" },
        { value: "Bar Hopping", label: "Bar Hopping" },
        { value: "Wine", label: "Wine" },
        { value: "Kickbacks", label: "Kickbacks" },
        { value: "Bicycling", label: "Bicycling" },
        { value: "Working Out", label: "Working Out" },
        { value: "Surfing", label: "Surfing" },
        { value: "Hiking", label: "Hiking" },
        { value: "Martial Arts", label: "Martial Arts" },
        { value: "Skating", label: "Skating" },
        { value: "Skiing", label: "Skiing" },
        { value: "Snowboarding", label: "Snowboarding" },
        { value: "Jogging", label: "Jogging" },
        { value: "Soccer", label: "Soccer" },
        { value: "Basketball", label: "Basketball" },
        { value: "Football", label: "Football" },
        { value: "Baseball", label: "Baseball" },
        { value: "Photography", label: "Photography" },  
        { value: "Baking", label: "Baking" },
        { value: "Cooking", label: "Cooking" },
        { value: "Grilling", label: "Grilling" },
        { value: "Coffee", label: "Coffee" },
        { value: "Music", label: "Music" },
        { value: "Music Production", label: "Music Production" },
        { value: "Cars", label: "Cars" },
        { value: "Gardening", label: "Gardening" },
        { value: "Painting", label: "Painting" },
        { value: "Drawing", label: "Drawing" },
        { value: "Reading", label: "Reading" },
        { value: "Fashion", label: "Fashion" },
        { value: "Interior Design", label: "Interior Design" },
        { value: "Singing", label: "Singing" },
        { value: "Movies", label: "Movies" },
        { value: "Physics", label: "Physics" },
        { value: "Math", label: "Math" },
        { value: "Finance", label: "Finance" },
        { value: "Entrepreneurship", label: "Entrepreneurship" },
      ];

      const possibleProjects = [
        { value: "Finance", label: "Finance" },
        { value: "Politics", label: "Politics" },
        { value: "Disease Modeling", label: "Disease Modeling" },
        { value: "Natural Language Processing", label: "Natural Language Processing" },
        { value: "Computer Vision", label: "Computer Vision" },
        { value: "Recommendation System", label: "Recommendation System" },
        { value: "Food", label: "Food" },
        { value: "Business", label: "Business" },
        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
        { value: "Social Media", label: "Social Media" },
        { value: "Environment", label: "Environment" },
        { value: "Other", label: "Other"},
      ];

      const possibleSkills = [
        { value: "Python", label: "Python" },
        { value: "TensorFlow", label: "TensorFlow" },
        { value: "PyTorch", label: "PyTorch" },
        { value: "Pandas", label: "Pandas" },
        { value: "NumPy", label: "NumPy" },
        { value: "scikit-learn", label: "scikit-learn" },
        { value: "R", label: "R" },
        { value: "Flutter", label: "Flutter" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "React Native", label: "React Native" },
        { value: "React JS", label: "React JS" },
        { value: "SQL", label: "SQL" },
        { value: "C++", label: "C++" },
        { value: "CAD", label: "CAD" },
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