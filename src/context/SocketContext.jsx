import { createContext , useRef , useEffect, useState } from "react";


import {io} from 'socket.io-client'

export const SocketContext = createContext();

const SocketProvider = ({children})=>{
    const [activeUsers , setActiveUsers] = useState([])
    const socket = useRef();
         console.log(process.env.REACT_APP_SOCKET_SERVER_URL)
    useEffect(()=>{
      socket.current = io(process.env.REACT_APP_SOCKET_SERVER_URL)
    },[])
    return (
        <SocketContext.Provider value={{
            socket,
            activeUsers,
            setActiveUsers
        }}>

            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;