import {Link} from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="NotFoundPage">
            <h1>404: Not Found</h1>
            <p>The requested page was not found</p>
            <Link to='/'>Go Home</Link>
        </div>
    )
}

export default NotFoundPage