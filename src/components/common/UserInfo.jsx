import useUser from "../../hooks/useUser.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export function UserInfo({userId}) {
    const {user, isLoading, error} = useUser(userId)

    if (isLoading) return <LoadingSpinner/>
    if (error) return <p>Error loading user {userId}</p>

    return (
        <p>{user?.display_name}</p>
    )
}