import { animateScroll } from 'react-scroll';

//Documetnación:  https://www.npmjs.com/package/react-scroll


/*
    Scroll automatico para que lo haga sin animacion, esto se usa para cuando se abre un chat por ejemplo.
*/
export const scrollToBottom = ( id ) => {

    setTimeout(() => {
        
        animateScroll.scrollToBottom({
            containerId: id,
            duration: 0,
            delay: 0,
            smooth: true,
            isDynamic: true,
            offset: -50
        })

    }, 1);

}


/*
    Este scroll si hace la animacion y se uasa cuando se estan mandando mensajes en chats abiertos
*/
export const scrollToBottomAnimated = ( id ) => {

    setTimeout(() => {

        animateScroll.scrollToBottom({
            containerId: id,
            duration: 160,
            delay: 0,
            smooth: true,
            isDynamic: true,
            offset: -50
        })

    }, 1);

}