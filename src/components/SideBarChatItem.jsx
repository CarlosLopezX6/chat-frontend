import { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';

import { fetchConToken } from '../helpers/fetch';

import { types } from '../types/types';
import { scrollToBottom } from '../helpers/scrollToBottom';


const userImage = `/assets/userImage.png`;


export const SideBarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { chatActivo } = chatState;


    const activarChat = async() => {

        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        })

        //Cargando mensajes del chat
        const resp = await fetchConToken(`mensajes/${ usuario.uid }`);

        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });


        /*
            Scroll sin animacion automatico al abrir un chat, se le pasa el id del container de los mensajes, 
            este se lo asignamos en el componente Messages, revisarlo
        */
        scrollToBottom('mensajes');

    }


    return (

        <div 
            className={`chat_list ${ (usuario.uid === chatActivo) && 'active_chat' }`}
            onClick={ activarChat }
        >   
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src={ userImage } alt="userImg" />
                </div>
                <div className="chat_ib">

                    <h5>{ usuario.name }</h5>

                    {
                        ( usuario.online ) 
                            ?  <span className="text-success">Online</span>
                            :  <span className="text-danger">Offline</span>

                    }

                </div>
            </div>
        </div>

    )
}
