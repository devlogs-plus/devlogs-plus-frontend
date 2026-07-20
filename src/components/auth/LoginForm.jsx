import {useRef, useState} from "react";
import {useLogin} from "../../hooks/useAuth.js";
import {useNavigate, useLocation} from "react-router-dom";

export function LoginForm() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(null)
    const loginMutation = useLogin()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    async function loginUser() {
        setError(null)

        const userObject = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        }
        try {
            await loginMutation.mutateAsync(userObject)
            navigate(from, {replace: true})
        } catch (err) {
            setError(err.message || "Login failed")
        }
    }

    return (
        <div className="loginForm">
            {error && <p className="error">{error}</p>}
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