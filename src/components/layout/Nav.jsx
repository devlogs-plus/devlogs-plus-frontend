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
        <nav className="navbar">

            <div className="navbar-brand">
                DEVLOGS +
            </div>

            <div className="navbar-links">

                {isLoading ? (
                    <span>Loading...</span>

                ) : user ? (

                    <>
                        <Link to="/">Home</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/projects/create">
                            Create Project
                        </Link>
                        <Link to="/devlogs/create">
                            Create Devlog
                        </Link>
                        <Link to="/devlogs/unpublished">
                            Unpublished Devlogs
                        </Link>

                        <button 
                            className="logout-button"
                            onClick={handleLogout}
                            disabled={logout.isLoading}
                        >
                            {logout.isLoading 
                                ? "Logging out..." 
                                : "Logout"}
                        </button>
                    </>

                ) : (

                    <>
                        <Link to="/">Home</Link>
                        <Link to="/projects">
                            Projects
                        </Link>
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/register">
                            Register
                        </Link>
                    </>

                )}

            </div>

        </nav>
    )
}
