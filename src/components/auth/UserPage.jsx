import {useParams} from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import AvatarImg from "../common/AvatarImg.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";

export function UserPage() {
    const {userId} = useParams()
    const {data: user, isLoading, isError, error} = useUser(userId)
    usePageTitle(user ? user.display_name : "Loading..");

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <ErrorPage message={error.message}/>

    return (
        <div>
            <h3>{user.display_name}</h3>
            <AvatarImg user={user}/>
            <p>User Id: {user.id}</p>
        </div>
    )
}

export default UserPage