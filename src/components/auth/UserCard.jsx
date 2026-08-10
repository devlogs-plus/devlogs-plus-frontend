import useUser from "../../hooks/useUser.js";
import styles from "./UserCard.module.css"
import {Link} from "react-router-dom";

export function UserCard({userId}) {
    const {user} = useUser(userId)

    return (
        <Link to={`/user/${userId}`}>
            <div className={styles.card}>
                <h3 className={styles.name}>{user.display_name}</h3>
                <p className={styles.id}>User Id: {user.id}</p>
            </div>
        </Link>
    )
}