import { Navigate, useLocation, Outlet} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

export function ProtectedRoute({children}) {
    const {user, isLoading} = useAuth()
    const location = useLocation()

    if(isLoading) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace state={{ from: location}}/>

    return children ?? <Outlet/>
}