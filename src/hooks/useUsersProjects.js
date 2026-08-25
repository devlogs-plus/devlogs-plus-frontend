import {useCallback, useEffect, useRef, useState} from "react";
import {getUsersProjects} from "../api/projects.js";

export default function useUsersProjects(params, userId) {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const paramsRef = useRef(params)
    paramsRef.current = params
    
    const fetchProjects = useCallback(async (p) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getUsersProjects(p ?? paramsRef.current, userId)
            setProjects(Array.isArray(data) ? data : (data?.projects ?? data?.data ?? []))
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        fetchProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refresh = useCallback(() => fetchProjects(), [fetchProjects])

    return {projects, loading, error, refresh}
}