import { useEffect, useState } from "react";
import {
    getArrayOfAllProjects,
    getHackaProjects,
    getWakaProjects,
} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import { extractHackaProjects, extractWakaProjects } from "../../helperFunctions.js";
import ProjectSelector from "../common/ProjectSelector.jsx";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState(null);
    const [hackaProjects, setHackaProjects] = useState(null);
    const [allProjects, setAllProjects] = useState(null);
    const [request, setRequest] = useState({time_tracking_projects: []})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true);

                let [waka, hacka] = await Promise.all([
                    getWakaProjects(),
                    getHackaProjects(),
                ]);

                waka = extractWakaProjects(waka);
                setWakaProjects(waka);

                hacka = extractHackaProjects(hacka);
                setHackaProjects(hacka);

                const allProjectsList = await getArrayOfAllProjects();
                setAllProjects(allProjectsList);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>All Projects</h1>

            <h3>Select one or more projects</h3>

            <ProjectSelector allProjects={allProjects} hackaProjects={hackaProjects} wakaProjects={wakaProjects} onRequestChange={setRequest}/>

            <h2>Request</h2>
            <pre>{JSON.stringify(request, null, 2)}</pre>

            <h2>All</h2>
            <pre>{JSON.stringify(allProjects, null, 2)}</pre>

            <h2>Waka</h2>
            <pre>{JSON.stringify(wakaProjects, null, 2)}</pre>

            <h2>Hacka</h2>
            <pre>{JSON.stringify(hackaProjects, null, 2)}</pre>
        </div>
    );
}