import {Link} from "react-router-dom";
import styles from "./NotFoundPage.module.css"
import usePageTitle from "../../hooks/usePageTitle.js";

export default function NotFoundPage() {
    usePageTitle('404: Not Found')
    return (
        <div className="NotFoundPage">
            <h1>404: Not Found</h1>
            <p>The requested page was not found</p>
            <Link className={styles.link} to='/'>Go Home</Link>
        </div>
    )
}