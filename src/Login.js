import React from 'react'
import './login.css'
import {auth, provider} from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

const [{}, dispatch] = useStateValue();

const onSignin = () => {
    auth.signInWithPopup(provider)
    .then(result => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })
    })
    .catch(err => alert(err.message));
} 

    return (
        <div className="box-1">
            <div className="box-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                     alt="image not found"
                />
                <h3>Sign in to Whatsapp</h3>
                <button className="btn"
                        onClick={onSignin}
                >
                    sign in with google
                </button>
            </div>
        </div>
    )
}

export default Login;
