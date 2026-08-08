import {useState} from "react";
import ProjectCard from "./ProjectCard.jsx";
import useProjects from "../../hooks/useProjects.js";
import ErrorPage from "../common/ErrorPage.jsx";
import {Button} from "../common/Button.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

export function ViewProjects() {
    const { projects, loading, error, refresh } = useProjects()
    const [page, setPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(projects.length / 10))
    const startIndex = (page - 1) * 10
    const visibleProjects = projects.slice(startIndex, startIndex + 10)

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>

    return (
        <>
            {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}

            <div>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <span>Page {page} of {totalPages}</span>
                <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                <Button onClick={refresh}>Refresh</Button>
            </div>
        </>
    );
}

export default ViewProjects