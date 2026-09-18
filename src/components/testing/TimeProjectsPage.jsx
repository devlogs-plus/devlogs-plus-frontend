import {useEffect, useState} from "react";
import {getHackaProjects, getWakaProjects} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {extractHackaProjects, extractWakaProjects} from "../../helperFunctions.js";
import Picker from "../common/Picker.jsx";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState(null)
    const [hackaProjects, sethackaProjects] = useState(null)
    const [allProjects, setAllProjects] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true)

                let [waka, hacka] = await Promise.all([
                    getWakaProjects(),
                    getHackaProjects()
                ])
                waka = extractWakaProjects(waka)
                setWakaProjects(waka)
                hacka = extractHackaProjects(hacka)
                sethackaProjects(hacka)
                setAllProjects([...waka, ...hacka])
            } catch (err) {
                console.error(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, []);

    if (loading) return <LoadingSpinner/>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>All Projects</h1>

            <h3>Select a Project</h3>
            <Picker onChange={setSelectedProject} selectedValue={selectedProject} options={allProjects}/>
            {selectedProject ? (
                <p>Selected: {selectedProject}</p>
            ) : (
                <p>select a thing</p>
            )}

            <h2>All</h2>
            <pre>{JSON.stringify(allProjects, null, 2)}</pre>

            <h2>Waka</h2>
            <pre>{JSON.stringify(wakaProjects, null, 2)}</pre>

            <h2>Hacka</h2>
            <pre>{JSON.stringify(hackaProjects, null, 2)}</pre>
        </div>
    )
}