import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { Spinner } from '../components/Spinner';


export const LoginPage = () => {

    const { login, loading } = useContext( AuthContext );

    const [ form, setForm ] = useState({
        email: '',
        password: '',
        rememberme: false
    })

    useEffect(() => {                       //Efecto que esta pendiente si se hizo rememberme para recordar un email

        const remembermeEmailLS = localStorage.getItem('email');
        if( remembermeEmailLS ) {
            setForm({
                ...form,
                rememberme: true,
                email: remembermeEmailLS
            })
            
            /* 
                Para que no se llame muchas veces el form al escribir en inputs, se pone esto pero en nuevas 
                versiones de react ya no es necesario
            */
            // setForm( (form) => ({        
            //     ...form,
            //     rememberme: true,
            //     email: remembermeEmailLS
            // }) )
        }


    }, [])
    

    const handleChange = ({ target }) => {

        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        })

    }

    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        })
    }

    const todoOk = () => {

        return ( form.email.length > 0 && form.password.length > 0 && !loading ) ? true : false

    }

    const handleSubmit = async( e ) => {
        e.preventDefault();

        if( form.rememberme ) {
            localStorage.setItem('email', form.email);
        } else {
            localStorage.removeItem('email');
        }

        const { email, password } = form;
        const ok = await login( email, password );

        if( !ok ) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        }
        
    }


    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={ handleSubmit }>

            <span className="login100-form-title mb-3">
                Ingresar - Chat Socket.io
            </span>
            
            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    value={ form.email }  
                    onChange={ handleChange }
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="password"
                    placeholder="Password" 
                    name="password"
                    value={ form.password }  
                    onChange={ handleChange }  
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div className="col" onClick={ toggleCheck }>
                    <input 
                        className="input-checkbox100" 
                        id="ckb1" 
                        type="checkbox" 
                        name="rememberme"
                        checked={ form.rememberme }  
                        readOnly 
                    />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="../register" className="txt1">
                        ¿Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn" type="submit" disabled={ !todoOk() }>
                    { 
                        loading 
                            ? ( <Spinner /> )
                            : ( <span> Ingresar </span> )
                    }
                </button>
            </div>

        </form>
    )
}
