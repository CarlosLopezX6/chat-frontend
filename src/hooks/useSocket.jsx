import { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

/*
    Este useSocket fue modificado en este proyecto para que lo sockets realicen desconexiones y conexiones de manera manual,
    ya que, anteriormente, cada que cargabamos la app, se conectaba un cliente automaticamente y cada que la recargabamos
    se conectaba uno diferente, en esta modificacion se generan 2 funciones que servirán para realizar la conexion y desconexion de
    manera manual, las dos funciones fueron encerradas en un useCallback para mantener su referencia ya que las usaremos dentro de 
    useEffects.

    La constante socketTemp es un socket temporal que creamos, esta creación tiene dos configuraciones nuevas:
        - autoConnect: true,             Que significa que este socket temporal esté siempre conectado.
        - forceNew: true                 Cuando se llame a la instruccion de io.connect siempre se generará una nueva conexion, 
        si no usamos esta configuración, va a intentar usar la conexion anterior y eso seria un inconveniente.
        -query:                          Pasamos el token en la query de configuracion, el nombre no tiene nada que ver con el backend, 
        podemos ponerle cualquiera pero para identificarlo mejor le ponemos x-token.
    
    El proposito de las modificaciones a este useSocket fue para que cada que se logee un usuario, este genere un socket de
    conexion y cuando se desconecte ps elimine el socket del servidor, tambien para que no genere automaticamente 
    un socket cada que nosotros iniciamos la app.

    Esta nueva función se utilizo en el socketContext, revisalo ahi.
*/

export const useSocket = ( serverPath ) => {
    
    //const socket = useMemo(() => io.connect( serverPath, {transports: ['websocket']} ), [ serverPath ] );
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        //setOnline( socket.connected );
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        //socket.on('connect', () => setOnline( true ));
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        //socket.on('disconnect', () => setOnline( false ));
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])


    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');  //Obtenemos el token de sesion del local storage.

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,                          
            forceNew: true,
            query: {      
                'x-token': token
            }                              
        } );

        setSocket( socketTemp );

    }, [ serverPath ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    }, [ socket ])


    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}