import {useRef, useState} from "react";
import {login} from "../../api/auth.js";

export function LoginForm() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    async function loginUser() {
        setError(null)
        setLoading(true)

        const userObject = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        }
        try {
            await login(userObject)
        } catch (err) {
            setError(err.message || "Login failed")
        } finally {
            setLoading(false)
        }

        login(userObject)
    }

    return (
        <div className="loginForm">
            {error && <p className="error">{error}</p>}
            <p>Email</p>
            <input type="email" name="email" ref={emailRef}/>
            <p>Password</p>
            <input type="password" name="password" ref={passwordRef}/>
            <button id="loginButton" onClick={loginUser} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    )
}