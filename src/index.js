import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccountProvider from './context/AccountProvider';
import SocketProvider from './context/SocketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <AccountProvider>
      <SocketProvider >

      <App />
      </SocketProvider>
    </AccountProvider>
);
