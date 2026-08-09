import {useRef, useState} from "react";
import {register} from "../../api/auth.js";
import {parseApiError} from "../../api/client.js";
import {useNavigate} from "react-router-dom";
import {createProject} from "../../api/projects.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";
import {isValidEmail} from "../../helperFunctions.js";

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

        const email = emailRef.current?.value?.trim() || ""
        const password = passwordRef.current?.value?.trim() || ""
        const displayName = nameRef.current?.value?.trim() || ""

        const errors = {}
        if (!email) errors.email = "Email is required"
        else if (!isValidEmail(email)) errors.email = "Please enter a valid email address"

        if (!password) errors.password = "Password is required"
        if (!displayName) errors.display_name = "Display Name is required"

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setIsSubmitting(false)
            return
        }

        const userObject = {
            "email": email,
            "password": password,
            "display_name": displayName
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
            <Input type="email" name="email" ref={emailRef}/>
            {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}

            <p>Username</p>
            <Input type="text" name="username" ref={nameRef}/>
            {fieldErrors.display_name && <p className="error">{fieldErrors.display_name}</p>}

            <p>Password</p>
            <Input type="password" name="password" ref={passwordRef}/>
            {fieldErrors.password && <p className="error">{fieldErrors.password}</p>}

            <br/>
            <Button id="registerButton" onClick={RegisterUser} disabled={isSubmitting}>{isSubmitting ? "Registering.." : "Register"}</Button>
        </div>
    )
}