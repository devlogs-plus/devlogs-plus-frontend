import { useEffect, useState } from "react";
import {
    getArrayOfAllProjects,
    getHackaProjects,
    getWakaProjects,
} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import { extractHackaProjects, extractWakaProjects } from "../../helperFunctions.js";
import MultiPicker from "../common/MultiPicker.jsx";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState(null);
    const [hackaProjects, setHackaProjects] = useState(null);
    const [allProjects, setAllProjects] = useState(null);
    const [selectedProjects, setSelectedProjects] = useState([]);
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

    const getProvider = (projectName) => {
        if (Array.isArray(wakaProjects) && wakaProjects.includes(projectName)) return "wakatime";
        if (Array.isArray(hackaProjects) && hackaProjects.includes(projectName)) return "hackatime";
        return "unknown";
    };

    const selectedRequest = {
        time_tracking_projects: selectedProjects.map((projectName) => ({
            name: projectName,
            provider: getProvider(projectName),
        })),
    };

    return (
        <div>
            <h1>All Projects</h1>

            <h3>Select one or more projects</h3>
            <MultiPicker
                options={allProjects || []}
                selectedValues={selectedProjects}
                onChange={setSelectedProjects}
            />

            <p>
                Selected:{" "}
                {selectedProjects.length ? selectedProjects.join(", ") : "none"}
            </p>

            <h2>Request</h2>
            <pre>{JSON.stringify(selectedRequest, null, 2)}</pre>

            <h2>All</h2>
            <pre>{JSON.stringify(allProjects, null, 2)}</pre>

            <h2>Waka</h2>
            <pre>{JSON.stringify(wakaProjects, null, 2)}</pre>

            <h2>Hacka</h2>
            <pre>{JSON.stringify(hackaProjects, null, 2)}</pre>
        </div>
    );
}