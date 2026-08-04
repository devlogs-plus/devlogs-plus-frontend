import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Link, Route, Routes} from "react-router-dom";
import {Nav} from "./components/layout/Nav.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.jsx";
import PageContainer from "./components/layout/PageContainer.jsx";
import ViewProjects from "./components/projects/ViewProjects.jsx";
import ProjectForm from "./components/projects/ProjectForm.jsx";
import ProjectView from "./components/projects/ProjectView.jsx";
import ProjectEditForm from "./components/projects/ProjectEditForm.jsx";
import NotFoundPage from "./components/common/NotFoundPage.jsx";
import ProjectDeletePage from "./components/projects/ProjectDeletePage.jsx";
import DevlogForm from "./components/devlogs/DevlogForm.jsx";
import UserUnpublishedDevlogs from "./routes/UserUnpublishedDevlogs.jsx";
import DevlogPage from "./components/devlogs/DevlogPage.jsx";
import DevlogEditForm from "./components/devlogs/DevlogEditForm.jsx";
import {DevlogUnpublishPage} from "./components/devlogs/DevlogUnpublishPage.jsx";

function HomePage() {
    const {user, isLoading} = useAuth()

    if (isLoading) return <div>Loading..</div>
    if (!user) return (
        <PageContainer title="Home">
            <h3>Welcome to Devlogs+</h3>
            <p>the place for you! (yes you) to share your devlogs!</p>
            <p>Want to join? <Link to="/register">Register</Link> or <Link to="/login">Login</Link>!!!</p>
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
                <Route path="/projects/:id" element={<ProjectView/>}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/projects/create" element={<ProjectForm/>}/>
                    <Route path="/projects/edit/:id" element={<ProjectEditForm/>}/>
                    <Route path="/projects/delete/:id" element={<ProjectDeletePage/>}/>
                    <Route path="/devlogs/create" element={<DevlogForm/>}/>
                    <Route path="/devlogs/unpublished" element={<UserUnpublishedDevlogs/>}/>
                    <Route path="/projects/:projectId/devlogs/:devlogId" element={<DevlogPage/>}/>
                    <Route path="/projects/:projectId/devlogs/:devlogId/edit" element={<DevlogEditForm/>}/>
                    <Route path="/projects/:projectId/devlogs/:devlogId/unpublish" element={<DevlogUnpublishPage/>}/>
                </Route>

                //404 page
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}
