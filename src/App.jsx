import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Route, Routes} from "react-router-dom";
import {Nav} from "./components/layout/Nav.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.jsx";

function HomePage() {
    const {user, isLoading} = useAuth()

    if (isLoading) return <div>Loading..</div>
    if (!user) return (
        <div>
            <p>Home Page</p>
            <p>You are not logged in</p>
        </div>
    )

    return (
        <div className="homepage">
            <p>Home Page</p>
            <p>Hello, {user?.display_name}. You are user number {user?.id}</p>
        </div>
    )
}

export default function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm />}/>
                <Route element={<ProtectedRoute />}>

                </Route>
            </Routes>
        </>
    )
}
