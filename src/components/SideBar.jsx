import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {

    //const chats = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    const { uid } = auth;

    return (

        <div className="inbox_chat">

            {
                chatState.usuarios
                    .filter( user => user.uid !== uid )
                    .map( ( usuario ) => (
                            <SideBarChatItem 
                                key={ usuario.uid } 
                                usuario={ usuario }
                            />
                        ) 
                    )
            }


            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>

        </div>
  
    )
}
