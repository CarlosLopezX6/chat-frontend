import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Spinner } from '../components/Spinner';

export const RegisterPage = () => {

    const { register, loading } = useContext( AuthContext );

    const [ form, setForm ] = useState({
        name: '',
        email: '',
        password: '',
    })


    const handleChange = ({ target }) => {

        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        })

    }

    const todoOk = () => {
        return ( form.name.length && form.email.length > 0 && form.password.length > 0 && !loading ) ? true : false
    }

    const handleSubmit = async( e ) => {
        e.preventDefault();

        const { name, email, password } = form;
        const resp = await register( name, email, password );

        if( !resp.ok ) {
            Swal.fire('Error', resp.msg, 'error');
        }
        
    }


    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={ handleSubmit }>

            <span className="login100-form-title mb-3">
                Registro - Chat Socket.io
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="text" 
                    placeholder="Nombre"
                    name="name"
                    value={ form.name }  
                    onChange={ handleChange }
                />
                <span className="focus-input100"></span>
            </div>

            
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
                <div className="col text-right">
                    <Link to="../login" className="txt1">
                        ¿Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn" type="submit" disabled={ !todoOk() } >
                    { 
                        loading 
                            ? ( <Spinner /> )
                            : ( <span> Crear Cuenta </span> )
                    }
                </button>
            </div>

        </form>
    )
}
