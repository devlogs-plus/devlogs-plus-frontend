import {useRef, useState} from "react";
import {useLogin} from "../../hooks/useAuth.js";
import {useNavigate, useLocation} from "react-router-dom";
import {parseApiError} from "../../api/client.js";

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

        const userObject = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value
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
            <input type="email" name="email" ref={emailRef}/>
            <p>Password</p>
            <input type="password" name="password" ref={passwordRef}/>
            <button id="loginButton" onClick={loginUser} disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </div>
    )
}