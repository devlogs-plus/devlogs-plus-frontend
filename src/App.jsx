import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Route, Routes} from "react-router-dom";
import {Nav} from "./components/layout/Nav.jsx";

function Home() {
    return (
        <p>Home Page</p>
    )
}

export default function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm />}/>
            </Routes>
        </>
    )
}
