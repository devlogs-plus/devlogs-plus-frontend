import {RegisterForm} from "./components/auth/RegisterForm.jsx";
import {LoginForm} from "./components/auth/LoginForm.jsx";
import {Route, Routes} from "react-router-dom";
import {Nav} from "./components/layout/Nav.jsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.jsx";
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
import AddCollaboratorPage from "./components/collaborator/AddCollaboratorPage.jsx";
import {CollaboratorList} from "./components/collaborator/CollaboratorList.jsx";
import RemoveCollaboratorPage from "./components/collaborator/RemoveCollaboratorPage.jsx";
import HomePage from "./components/common/HomePage.jsx";
import {OwnUserPage} from "./components/auth/OwnUserPage.jsx";
import EditOwnUser from "./components/auth/EditOwnUser.jsx";
import UserPage from "./components/auth/UserPage.jsx";
import {GithubCallback} from "./routes/GithubCallback.jsx";
import {HackclubCallback} from "./routes/HackclubCallback.jsx";
import DeleteSelfPage from "./components/auth/DeleteSelfPage.jsx";
import {PasswordChangePage} from "./components/auth/PasswordChangePage.jsx";
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
                    <Route path="/projects/:projectId/collaborators/add" element={<AddCollaboratorPage/>}/>
                    <Route path="/projects/:projectId/collaborators" element={<CollaboratorList/>}/>
                    <Route path="/projects/:projectId/collaborators/remove" element={<RemoveCollaboratorPage/>}/>
                    <Route path="/me" element={<OwnUserPage/>}/>
                    <Route path="/me/edit" element={<EditOwnUser/>}/>
                    <Route path="/me/delete" element={<DeleteSelfPage/>}/>
                    <Route path="/me/changepassword" element={<PasswordChangePage/>}/>
                </Route>
                <Route path="/user/:userId" element={<UserPage/>}/>
                <Route path="/auth/github/callback" element={<GithubCallback/>}/>
                <Route path="/auth/hackclub/callback" element={<HackclubCallback/>}/>
                //404 page
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}
