import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useLogout} from "../../hooks/useAuth.js";
import {Button} from "../common/Button.jsx";
import styles from "./Nav.module.css"

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
                    <Button onClick={handleLogout} disabled={logout.isLoading}>
                        {logout.isLoading ? "Logging out":"Logout"}
                    </Button>{" "}
                    | <Link className={styles.link} to="/me">You</Link> {" "}
                    | <Link className={styles.link} to="/">Home</Link> {" "}
                    | <Link className={styles.link} to="/projects/create">Create a Project</Link> {" "}
                    | <Link className={styles.link} to="/devlogs/create">Create a Devlog</Link> {" "}
                    | <Link className={styles.link} to="/projects">Projects</Link> {" "}
                    | <Link className={styles.link} to="/devlogs/unpublished">Unpublished Devlogs</Link>
                </>
            ): (
                <>
                    <Link className={styles.link} to="/">Home</Link> | <Link className={styles.link} to="/projects">Projects</Link> | {" "}
                    <Link className={styles.link} to="/login">Login</Link> {" "}
                    | <Link className={styles.link} to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}