import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {Button} from "../common/Button.jsx";
import AvatarImg from "../common/AvatarImg.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";

export function OwnUserPage() {
    const {user, isLoading} = useAuth()
    usePageTitle("You")

    if (isLoading) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace/>

    return (
        <div>
            <h3>{user.display_name}</h3>
            <AvatarImg user={user}/>
            <p>Email: {user.email}</p>
            <p>User Id: {user.id}</p>
            <Link to="/me/edit"><Button>Edit</Button></Link>
            <Link to="/me/delete"><Button>Delete Account</Button></Link>
            <Link to="/me/changepassword"><Button>Change Password</Button></Link>
        </div>
    )
}

export default OwnUserPage