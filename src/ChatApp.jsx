import React, { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const ChatApp = () => {

    const { auth, verificarToken } = useContext( AuthContext );

    useEffect(() => {
        verificarToken();
    }, [])

    if( auth.checking ) {
        return <h1>Cargando...</h1>
    }
    

    return (
        //<AuthProvider>

            <RouterProvider router={ router } />
            
        //</AuthProvider>
    )
}
