import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';

export const Messages = () => {
    
    //const msgs = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );


    return (

        <div className="mesgs">

            {/* <!-- Historia inicio --> LE AGREGAMOS ID PARA EL SCROLL AUTOMATICO*/}
            <div id="mensajes" className="msg_history">

                {
                    chatState.mensajes.map( msg => (
                            ( msg.para === auth.uid )           //Si el mensaje lo recibo yo
                                ? <IncomingMessage key={ msg._id } msg={ msg } />
                                : <OutgoingMessage key={ msg._id } msg={ msg } /> 
                        )
                    )
                }

            </div>
            {/* <!-- Historia Fin --> */}

            <SendMessage />

        </div>
 
    )
}
