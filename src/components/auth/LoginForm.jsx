import {useRef, useState} from "react";
import {useLogin} from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export function LoginForm() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(null)
    const loginMutation = useLogin()
    const navigate = useNavigate()

    async function loginUser() {
        setError(null)

        const userObject = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        }
        try {
            await loginMutation.mutateAsync(userObject)
            navigate("/")
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