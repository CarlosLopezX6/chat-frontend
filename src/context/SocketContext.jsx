import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

import { AuthContext } from './AuthContext';
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';


export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    //const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { socket, online, conectarSocket, desconectarSocket } = useSocket("https://megas-chat.onrender.com");
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );

    useEffect(() => {           //Efecto que esta pendiente de la autenticación, si esta logueado, conectar el socket.
        if( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ])

    useEffect(() => {           //Efecto que esta pendiente de la autenticación, si no esta logueado, desconectar el socket.
        if( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ])

    useEffect(() => {           //Escuchar los cambios en los usuarios conectados.
        
        socket?.on('lista-usuarios', ( usuarios ) => {
            
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })

        })

    }, [ socket, dispatch ])

    useEffect(() => {           //Escuchar los mensaje personales que se envian.

        socket?.on('mensaje-personal', (mensaje) => {
            
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            /*
                Scroll con animacion al recibir o enviar mensajes, se le pasa el id del container de los mensajes, 
                este se lo asignamos en el componente Messages, revisarlo
            */
            scrollToBottomAnimated('mensajes');

        })

    }, [ socket, dispatch ])
    
    
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}