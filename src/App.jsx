import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<RegisterForm/>}/>
        </Routes>
    )
}
