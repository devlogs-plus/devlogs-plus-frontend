import { useEffect, useState } from "react";
import {
    getHackaProjects,
    getWakaProjects,
} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import { extractHackaProjects, extractWakaProjects } from "../../helperFunctions.js";
import ProjectSelector from "../common/ProjectSelector.jsx";
import BackButton from "../common/BackButton.jsx";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState([]);
    const [hackaProjects, setHackaProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [request, setRequest] = useState({time_tracking_projects: []})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [providerWarnings, setProviderWarnings] = useState([]);

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true);
                setError(null);

                const warnings = [];

                let waka = [];
                try {
                    waka = extractWakaProjects(await getWakaProjects());
                } catch (err) {
                    console.warn(err);
                    warnings.push("Wakatime account is not connected.");
                }

                let hacka = [];
                try {
                    hacka = extractHackaProjects(await getHackaProjects());
                } catch (err) {
                    console.warn(err);
                    warnings.push("Hackatime account is not connected.");
                }

                setWakaProjects(waka);
                setHackaProjects(hacka);
                setAllProjects([...waka, ...hacka]);
                setProviderWarnings(warnings);
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
    if (error) return <p>{error.message ?? String(error)}</p>;

    return (
        <div>
            <h1>All Projects</h1>
            <BackButton/>

            {providerWarnings.map((warning) => (
                <p className="error" key={warning}>{warning}</p>
            ))}

            {allProjects.length === 0 ? (
                <p>Connect a Wakatime or Hackatime account to view time tracking projects.</p>
            ) : (
                <>
                    <h3>Select one or more projects</h3>

                    <ProjectSelector
                        allProjects={allProjects}
                        hackaProjects={hackaProjects}
                        wakaProjects={wakaProjects}
                        onRequestChange={setRequest}
                    />
                </>
            )}

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