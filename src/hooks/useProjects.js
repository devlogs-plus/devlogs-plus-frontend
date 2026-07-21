import { useEffect, useState, useCallback, useRef } from "react";
import { getProjects } from "../api/projects.js";

export default function useProjects(params) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Keep a ref of the latest params so refresh uses the latest value if needed.
    const paramsRef = useRef(params);
    paramsRef.current = params;

    const fetchProjects = useCallback(async (p) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProjects(p ?? paramsRef.current);
            setProjects(Array.isArray(data) ? data : (data?.projects ?? data?.data ?? []));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // stable function

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // fetch on mount only

    const refresh = useCallback(() => fetchProjects(), [fetchProjects]);

    return { projects, loading, error, refresh };
}