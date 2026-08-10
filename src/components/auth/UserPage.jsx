import {useParams} from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";

export function UserPage() {
    const {userId} = useParams()
    const {data: user, isLoading, isError, error} = useUser(userId)

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage message={error.message}/>

    return (
        <div>
            <h3>{user.display_name}</h3>
            <p>Email: {user.email}</p>
            <p>Avatar Url:{user.avatar_url ?? "No avatar set"}</p>
            <p>User Id: {user.id}</p>
        </div>
    )
}

export default UserPage