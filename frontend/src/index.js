import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="499039493710-4lue8b3dcu21n7r4attndkrn0hfqp6km.apps.googleusercontent.com">
    <ChatProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ChatProvider>
  </GoogleOAuthProvider>
);

