import {useCurrentUser} from "../../hooks/useAuth.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {useNavigate} from "react-router-dom";

export function OwnUserPage() {
    const {data: user, isLoading} = useCurrentUser()
    const navigate = useNavigate()

    if (isLoading) return <LoadingSpinner/>
    if (!user) return navigate('/login')

    return (
        <div>
            <h3>{user.display_name}</h3>
            <p>Email: {user.email}</p>
            <p>Avatar Url: {user.avatar_url}</p>
            <p>User Id: {user.id}</p>
        </div>
    )
}