import React from 'react'
import { Route } from "react-router-dom";
import ChatPage from './Pages/ChatPage';
import Explore from './Pages/Explore';
import Hero from './Pages/Hero';
import GoogleSignUp from './Pages/GoogleSignUp';

function App() {


  return (
    <div>
      <Route path="/" component={Hero} exact/>
      <Route path="/chats" component={ChatPage} exact />
      <Route path="/explore" component={Explore} exact/>
      <Route path="/signup" component={GoogleSignUp} exact/>

    </div>
  );
}

export default App;
