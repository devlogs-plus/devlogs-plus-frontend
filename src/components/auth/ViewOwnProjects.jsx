import {useParams} from "react-router-dom";
import useUsersProjects from "../../hooks/projects/useUsersProjects.js";
import {useState} from "react";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import ProjectCard from "../projects/ProjectCard.jsx";
import {Button} from "../common/Button.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export default function ViewOwnProjects() {
    const {user} = useAuth()
    const userId = user?.id
    const {projects, loading, error, refresh} = useUsersProjects({}, userId)
    const [page, setPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(projects.length / 10))
    const startIndex = (page -1) * 10
    const visibleProjects = projects.slice(startIndex, startIndex + 10)

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>

    return (
        <>
            {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project}/>
            ))}

            <div>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <span>Page {page} of {totalPages}</span>
                <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                <Button onClick={refresh}>Refresh</Button>
            </div>
        </>
    )
}