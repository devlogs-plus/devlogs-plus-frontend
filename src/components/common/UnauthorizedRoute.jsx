import {Link} from "react-router-dom";
import styles from "./UnauthorizedRoute.module.css"

export function UnauthorizedRoute() {
    return (
        <div className='unauthorizedPage'>
            <h1>403: Unauthorized</h1>
            <p>You are not allowed to view this page.</p>
            <Link className={styles.link} to='/'>Go Home</Link>
        </div>
    )
}