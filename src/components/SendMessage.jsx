import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

import { BiSend } from "react-icons/bi";


export const SendMessage = () => {

    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    const [ mensaje, setMensaje ] = useState('');



    const handleChange = ({ target }) => {
        setMensaje( target.value );
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if( mensaje.length === 0 ){
            return;
        }

        setMensaje('');

        //Emitir evento de sockets para enviar mensaje
        /*
            {
                de:             //  uid del usuario que envia el mensaje
                para:           //  uid del usuario que recibe el mensaje
                mensaje:        //  Lo que quiero enviar
            }
        */
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje: mensaje
        })

    }


    return (
        <form onSubmit={ handleSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..."
                        value={ mensaje }
                        onChange={ handleChange } 
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        <BiSend style={{fontSize: '20px', marginRight: '2px'}}/> Enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
