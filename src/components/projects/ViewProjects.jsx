import {useState} from "react";
import ProjectCard from "./ProjectCard.jsx";
import useProjects from "../../hooks/useProjects.js";

export function ViewProjects() {
    const { projects, loading, error, refresh } = useProjects(); // or useProjects({ all: true }) if your API supports a param
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(projects.length / 10)); // 10 per page
    const startIndex = (page - 1) * 10;
    const visibleProjects = projects.slice(startIndex, startIndex + 10);

    if (loading) return <div>Loading projects…</div>;
    if (error) return <div>Error loading projects: {String(error.message)}</div>;

    return (
        <>
            {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}

            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
                <button onClick={refresh}>Refresh</button>
            </div>
        </>
    );
}

export default ViewProjects