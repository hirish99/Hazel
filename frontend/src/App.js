import React from 'react'
import { Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import Explore from './Pages/Explore';

function App() {


  return (
    <div>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="/explore" component={Explore} />
    </div>
  );
}

export default App;
