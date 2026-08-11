import {useAuth} from "../../context/AuthContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import PageContainer from "../layout/PageContainer.jsx";
import {Link} from "react-router-dom";
import styles from "./HomePage.module.css"
import {ViewFeed} from "../devlogs/ViewFeed.jsx";

export default function HomePage() {
    const {user, isLoading} = useAuth()

    if (isLoading) return <LoadingSpinner/>
    if (!user) return (
        <PageContainer title="Home">
            <h3>Welcome to Devlogs+</h3>
            <p>the place for you! (yes you) to share your devlogs!</p>
            <p>Want to join? <Link className={styles.link} to="/register">Register</Link> or <Link className={styles.link} to="/login">Login</Link>!!!</p>
        </PageContainer>
    )

    return (
        <PageContainer title="Home">
            <p>Hello, {user.display_name}</p>
            <p>user id: {user.id}</p>
            <ViewFeed/>
        </PageContainer>
    );
}
