import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useLogout} from "../../hooks/useAuth.js";

export function Nav() {
    const {user, isLoading} = useAuth()
    const logout = useLogout()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logout.mutateAsync()
            navigate("/login")
        } catch (err) {
            console.log("logout failed", err)
        }
    }

    return (
        <nav>
            {isLoading ? (
                <>
                    <span>Loading</span> | <Link to="/">Home</Link>
                </>
            ) : user ? (
                <>
                    <button onClick={handleLogout} disabled={logout.isLoading}>
                        {logout.isLoading ? "Logging out":"Logout"}
                    </button>{" "}
                    | <Link to="/">Home</Link> {" "}
                    | <Link to="/projects/create">Create a Project</Link> {" "}
                    | <Link to="/devlogs/create">Create a Devlog</Link> {" "}
                    | <Link to="/projects">Projects</Link> {" "}
                </>
            ): (
                <>
                    <Link to="/">Home</Link> | <Link to="/projects">Projects</Link>| {" "}
                    <Link to="/login">Login</Link> {" "}
                    | <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}