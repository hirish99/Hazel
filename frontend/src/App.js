import React from 'react'
import { Route } from "react-router-dom";
import ChatPage from './Pages/ChatPage';
import Explore from './Pages/Explore';
import Hero from './Pages/Hero';
import GoogleSignUp from './Pages/GoogleSignUp';
import SidebarWithHeader from './Pages/SidebarWithHeader';
import BlogPostPage from './Pages/BlogPostPage';
import Settings from './Pages/Settings'
import Test from './Pages/Test';
import ClubSignUp from './Pages/ClubSignUp';

function App() {


  return (
    <div>
      <Route path="/" component={Hero} exact/>
      <Route path="/chats" component={ChatPage} exact />
      <Route path="/explore" component={Explore} exact/>
      <Route path="/signup" component={GoogleSignUp} exact/>
      <Route path="/play" component={SidebarWithHeader} exact/>
      <Route path="/projects" component={BlogPostPage} exact/>
      <Route path="/profile" component={Settings} exact/>
      <Route path="/test" component={Test} exact/>
      <Route path="/clubsignup" component={ClubSignUp} exact/>

    </div>
  );
}

export default App;
