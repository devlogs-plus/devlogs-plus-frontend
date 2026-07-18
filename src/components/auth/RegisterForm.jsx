import {useRef} from "react";
import {register} from "../../api/auth.js";

export function RegisterForm(){
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)

    function RegisterUser() {
        const userObject = {
            "email": emailRef.current.value.toString(),
            "password": passwordRef.current.value.toString(),
            "display_name": nameRef.current.value.toString()
        }

        register(userObject)
    }

    return (
        <div className="registerForm">
            <p>Email</p>
            <input type="email" name="email" ref={emailRef}/>
            <p>Username</p>
            <input type="text" name="username" ref={nameRef}/>
            <p>Password</p>
            <input type="password" name="password" ref={passwordRef}/>
            <br/>
            <button id="registerButton" onClick={RegisterUser}>Register</button>
        </div>
    )
}