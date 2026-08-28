import useUser from "../../hooks/useUser.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export function UserInfo({userId, email=false, username=true}) {
    const {user, isLoading, error} = useUser(userId)

    if (isLoading) return <LoadingSpinner/>
    if (error) return <p>Error loading user {userId}</p>

    if (email) {
        return <p>{user?.email}</p>
    } else if (username) {
        return <p>{user?.username}</p>
    } else if (!email && !username) {
        return <p>{user?.id}</p>
    } else {
        return <p>{user?.id}</p>
    }
}