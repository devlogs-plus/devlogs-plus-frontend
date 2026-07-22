import {Link} from "react-router-dom";

export function UnauthorizedRoute() {
    return (
        <div className='unauthorizedPage'>
            <h1>403: Unauthorized</h1>
            <p>You are not allowed to view this page.</p>
            <Link to='/'>Go Home</Link>
        </div>
    )
}