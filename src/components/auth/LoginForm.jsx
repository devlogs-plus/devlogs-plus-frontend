import {useRef, useState} from "react";
import {useLogin} from "../../hooks/useAuth.js";
import {useNavigate, useLocation} from "react-router-dom";
import {parseApiError} from "../../api/client.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";
import {isValidEmail} from "../../helperFunctions.js";

export function LoginForm() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [generalError, setGeneralError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const loginMutation = useLogin()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    async function loginUser() {
        setGeneralError(null)
        setFieldErrors({})
        const email = emailRef.current?.value?.trim() || ""
        const password = passwordRef.current?.value?.trim() || ""

        if (!email) {
            setFieldErrors({email: "Email is required"})
            return
        }
        if (!isValidEmail(email)) {
            setFieldErrors({email: "Please enter a valid email address"})
            return
        }
        if (!password) {
            setFieldErrors({password: "Password is required"})
            return
        }

        const userObject = {
            "email": email,
            "password": password
        }

        try {
            await loginMutation.mutateAsync(userObject)
            navigate(from, {replace: true})
        } catch (err) {
            const parsed = parseApiError(err)
            setGeneralError(parsed.message)
            setFieldErrors(parsed.fields || {})
        }
    }

    return (
        <div className="loginForm">
            {generalError && <p className="error">{generalError}</p>}
            <p>Email</p>
            <Input type="email" name="email" ref={emailRef}/>
            {fieldErrors.email && <p className="error">{fieldErrors.email}</p> }

            <p>Password</p>
            <Input type="password" name="password" ref={passwordRef}/>
            {fieldErrors.password && <p className="error">{fieldErrors.password}</p>}

            <Button id="loginButton" onClick={loginUser} disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
        </div>
    )
}