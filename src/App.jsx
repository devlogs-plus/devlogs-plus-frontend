import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Route, Routes, Link} from "react-router-dom";

export default function App() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm />}/>
            </Routes>
        </>
    )
}
