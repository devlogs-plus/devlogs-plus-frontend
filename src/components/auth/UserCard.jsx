import useUser from "../../hooks/useUser.js";
import styles from "./UserCard.module.css"
import {Link} from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";

export function UserCard({userId}) {
    const {user, isLoading, isError,error} = useUser(userId)

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage message={error.message}/>
    if (!user) return null

    return (
        <Link to={`/user/${userId}`}>
            <div className={styles.card}>
                <h3 className={styles.name}>{user.display_name}</h3>
                <p className={styles.id}>User Id: {user.id}</p>
            </div>
        </Link>
    )
}