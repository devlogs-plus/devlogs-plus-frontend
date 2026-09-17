import {useEffect, useState} from "react";
import {getHackaProjects, getWakaProjects} from "../../api/timetracking.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";

export default function TimeProjectsPage() {
    const [wakaProjects, setWakaProjects] = useState(null)
    const [hackaProject, setHackaProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true)

                const [waka, hacka] = await Promise.all([
                    getWakaProjects(),
                    getHackaProjects()
                ])
                setWakaProjects(waka)
                setHackaProjects(hacka)
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
    if (error) return <ErrorPage message={error}/>

    return (
        <div>
            <h1>All Projects</h1>

            <h2>Waka</h2>
            <pre>{JSON.stringify(wakaProjects, null, 2)}</pre>

            <h2>Hacka</h2>
            <pre>{JSON.stringify(hackaProject, null, 2)}</pre>
        </div>
    )
}