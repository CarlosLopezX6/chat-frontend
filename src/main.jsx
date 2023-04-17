import React from 'react'
import ReactDOM from 'react-dom/client'

import { ChatApp } from './ChatApp'

import { ChatProvider } from './context/chat/ChatContext'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ChatProvider>
    <AuthProvider>
      <SocketProvider>
      
        <ChatApp />

      </SocketProvider>
    </AuthProvider>
  </ChatProvider>
  //</React.StrictMode>,
)
