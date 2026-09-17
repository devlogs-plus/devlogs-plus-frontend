import {useEffect, useState} from "react";
import {getHackaProjects, getWakaProjects} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {extractHackaProjects, extractWakaProjects} from "../../helperFunctions.js";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState(null)
    const [hackaProjects, sethackaProjects] = useState(null)

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

            <h2>Waka</h2>
            <pre>{JSON.stringify(wakaProjects, null, 2)}</pre>

            <h2>Hacka</h2>
            <pre>{JSON.stringify(hackaProjects, null, 2)}</pre>
        </div>
    )
}