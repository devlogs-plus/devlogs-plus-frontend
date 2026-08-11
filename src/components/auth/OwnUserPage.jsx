import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {Button} from "../common/Button.jsx";
import styles from "./UserPage.module.css";

export function OwnUserPage() {
    const {user, isLoading} = useAuth()
    const navigate = useNavigate()

    if (isLoading) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace/>

    return (
        <div>
            <h3>{user.display_name}</h3>
            {user.avatar_url
                ? (
                    <img
                        src={user.avatar_url}
                        alt="avatar"
                        className={styles.img}
                    />
                )
                : (
                    <img src="/default_user_photo.png" alt="deafult avatar" className={styles.img}/>
                )
            }
            <p>Email: {user.email}</p>
            <p>User Id: {user.id}</p>
            <Link to="/me/edit"><Button>Edit</Button></Link>
        </div>
    )
}

export default OwnUserPage