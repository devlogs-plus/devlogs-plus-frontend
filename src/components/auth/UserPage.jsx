import {useParams} from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import styles from "./UserPage.module.css"

export function UserPage() {
    const {userId} = useParams()
    const {data: user, isLoading, isError, error} = useUser(userId)

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage message={error.message}/>

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
            <p>User Id: {user.id}</p>
        </div>
    )
}

export default UserPage