import {useRef, useState} from "react";
import {register} from "../../api/auth.js";
import {parseApiError} from "../../api/client.js";
import {useNavigate} from "react-router-dom";
import {createProject} from "../../api/projects.js";

export function RegisterForm(){
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)

    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate()

    async function RegisterUser() {
        setGeneralError(null)
        setFieldErrors({})
        setSuccessMessage(null)
        setIsSubmitting(true)

        const userObject = {
            "email": emailRef.current.value?.toString(),
            "password": passwordRef.current.value?.toString(),
            "display_name": nameRef.current.value?.toString()
        }

        try {
            await register(userObject)
            setSuccessMessage("Registered successfully. Please login")
            navigate("/login")
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="registerForm">
            {generalError && <p className="error">{generalError}</p>}
            {successMessage && <p className="success">{successMessage}</p> }

            <p>Email</p>
            <input type="email" name="email" ref={emailRef}/>
            {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}

            <p>Username</p>
            <input type="text" name="username" ref={nameRef}/>
            {fieldErrors.display_name && <p className="error">{fieldErrors.display_name}</p>}

            <p>Password</p>
            <input type="password" name="password" ref={passwordRef}/>
            {fieldErrors.password && <p className="error">{fieldErrors.password}</p>}

            <br/>
            <button id="registerButton" onClick={RegisterUser} disabled={isSubmitting}>{isSubmitting ? "Registering.." : "Register"}</button>
        </div>
    )
}