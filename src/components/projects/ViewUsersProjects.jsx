import useUsersProjects from "../../hooks/useUsersProjects.js";
import {useState} from "react";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {Button} from "../common/Button.jsx";

export function ViewUsersProjects() {
    const {userId} = useParams()
    const {projects, loading, error, refresh} = useUsersProjects(userId)
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

export default ViewUsersProjects