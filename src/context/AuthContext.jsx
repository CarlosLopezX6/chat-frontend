import { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from './chat/ChatContext';

import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';


export const AuthContext = createContext();

const initialState = {
    checking: true,
    uid: null,
    name: null,
    email: null,
    logged: false
}

export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState( initialState );
    const [ loading, setLoading ] = useState( false );
    const { dispatch } = useContext( ChatContext );


    const login = async( email, password ) => {

        setLoading( true );

        const resp = await fetchSinToken('auth', { email, password }, 'POST');

        if( resp.ok ) {

            localStorage.setItem('token', resp.token);

            const { usuario } = resp;

            setAuth({
                checking: false,      //pasa a false porque ya se autentico.
                uid: usuario.uid,
                name: usuario.name,
                email: usuario.email,
                logged: true
            })

        }

        setLoading( false );

        //console.log( resp );

        return resp.ok
    }

    const logout = () => {

        localStorage.removeItem('token');

        dispatch({
            type: types.cerrarSesion
        })

        setAuth({
            checking: false,     
            logged: false
        })
    }

    const register = async( name, email, password ) => {

        setLoading( true );

        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');

        if( resp.ok ) {

            localStorage.setItem('token', resp.token);

            const { usuario } = resp;

            setAuth({
                checking: false,      //pasa a false porque ya se autentico.
                uid: usuario.uid,
                name: usuario.name,
                email: usuario.email,
                logged: true
            })

        }

        setLoading( false );

        //console.log( resp );

        return resp;
    }

    const verificarToken = useCallback( async() => {

        const token = localStorage.getItem('token');

        if( !token ) {
            setAuth({
                checking: false,     
                uid: null,
                name: null,
                email: null,
                logged: false
            })
            return false;
        }

        const resp = await fetchConToken('auth/renew');

        if( resp.ok ) {

            localStorage.setItem('token', resp.token);

            const { usuario } = resp;

            //console.log( resp );

            setAuth({
                checking: false,      //pasa a false porque ya se autentico.
                uid: usuario.uid,
                name: usuario.name,
                email: usuario.email,
                logged: true
            })
            return true;

        } else {

            setAuth({
                checking: false,     
                uid: null,
                name: null,
                email: null,
                logged: false
            })
            return false;

        }

    }, [])
    

    return (
        <AuthContext.Provider value={{
            auth,
            loading,
            login,
            logout,
            register,
            verificarToken,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
