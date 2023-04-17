import { types } from "../../types/types";


export const chatReducer = (state, action) => {

    switch ( action.type ) {

        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }
        
        case types.activarChat:

            /* 
                Al activar un chat se deben de eliminar los mensajes de la pantalla de chat y con otra tarea llenarlo, pero si 
                volvemos a seleccionar otravez la misma persona ps solo retornamos el state que ya habia.
            */
            if ( state.chatActivo === action.payload ) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }
        
        case types.nuevoMensaje:
            //Si tengo el chat activo de la persona que me envia mensaje
            if ( state.chatActivo === action.payload.de || state.chatActivo === action.payload.para ) {           
                return {
                    ...state,
                    mensajes: [ ...state.mensajes, action.payload ]
                }
            } else {                                                  //Si no tengo el chat activo de la persona que me envia mensaje
                return state;
            }
        
        case types.cargarMensajes:
            return {
                ...state,
                mensajes: [ ...action.payload ]
            }
        
        case types.cerrarSesion:
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: []
            }

        default:
            return state;
    }
}
