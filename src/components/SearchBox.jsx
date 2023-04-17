import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import { BiLogOut } from "react-icons/bi";


export const SearchBox = () => {

    const { auth, logout } = useContext( AuthContext )

    return (
        
        <div className="headind_srch">
            <div className="recent_heading" style={{ marginTop: '13px'}}>
                <h4>{ auth.name }</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <button className="logout-btn" onClick={ logout }>
                        <BiLogOut style={{fontSize: '20px', marginRight: '3px'}}/> Salir
                    </button>
                </div>
            </div>
        </div>
   
    )
}
