import {useCallback, useEffect, useState} from "react";
import {getDevlogsByProject} from "../api/devlogs.js";

export default function useDevlogs({projectId}) {
    const [devlogs, setDevlogs] = useState([])
    const [loading, setLoading] = useState(Boolean(projectId))
    const [error, setError] = useState(null)

    const fetchDevlogs = useCallback(async () => {
        if (!projectId) {
            setDevlogs([])
            setLoading(false)
            setError(null)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const data = await getDevlogsByProject(projectId)
            setDevlogs(Array.isArray(data) ? data : (data.devlogs ?? data.data ?? []))
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [projectId])

    useEffect(() => {
        fetchDevlogs()
    }, [fetchDevlogs])

    return {devlogs, loading, error, refresh: fetchDevlogs}
}