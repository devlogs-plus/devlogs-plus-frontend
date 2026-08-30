import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLogout } from "../../hooks/useAuth.js";
import { Button } from "../common/Button.jsx";
import styles from "./Nav.module.css";

export function Nav() {
    const { user, isLoading } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout.mutateAsync();
            navigate("/login");
        } catch (err) {
            console.log("logout failed", err);
        }
    }

    const linkClassName = ({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
                <li>
                    <NavLink className={linkClassName} to="/">
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink className={linkClassName} to="/projects">
                        Projects
                    </NavLink>
                </li>

                {isLoading ? (
                    <li className={styles.status}>Loading...</li>
                ) : user ? (
                    <>
                        <li>
                            <NavLink className={linkClassName} to="/devlogs/unpublished">
                                Drafts
                            </NavLink>
                        </li>

                        <li className={styles.spacer}></li>

                        <li>
                            <NavLink className={linkClassName} to="/projects/create">
                                New Project
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={linkClassName} to="/devlogs/create">
                                New Devlog
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={linkClassName} to="/me">
                                Profile
                            </NavLink>
                        </li>

                        <li>
                            <Button onClick={handleLogout} disabled={logout.isPending}>
                                {logout.isPending ? "Logging out..." : "Logout"}
                            </Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={styles.spacer}></li>

                        <li>
                            <NavLink className={linkClassName} to="/login">
                                Login
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={linkClassName} to="/register">
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}