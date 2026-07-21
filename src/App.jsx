import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Route, Routes} from "react-router-dom";
import {Nav} from "./components/layout/Nav.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.jsx";
import PageContainer from "./components/layout/PageContainer.jsx";
import ViewProjects from "./components/projects/ViewProjects.jsx";
import ProjectForm from "./components/projects/ProjectForm.jsx";

function HomePage() {
    const {user, isLoading} = useAuth()

    if (isLoading) return <div>Loading..</div>
    if (!user) return (
        <PageContainer title="Home">
            <p>You are not logged in. You should login</p>
        </PageContainer>
    )

    return (
        <PageContainer title="Home">
            <p>Hello, {user.display_name}</p>
        </PageContainer>
    );
}

export default function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm />}/>
                <Route path="/projects" element={<ViewProjects/>}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/createproject" element={<ProjectForm/>}/>
                </Route>
            </Routes>
        </>
    )
}
