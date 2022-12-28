import React from 'react'
import { Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import Explore from './Pages/Explore';
import Hero from './Pages/Hero';
import Preferences from './Pages/Preferences';

function App() {


  return (
    <div>
      <Route path="/" component={Hero} exact/>
      <Route path="/chats" component={ChatPage} exact />
      <Route path="/explore" component={Explore} exact/>
      <Route path="/signup" component={Preferences} exact/>

    </div>
  );
}

export default App;
