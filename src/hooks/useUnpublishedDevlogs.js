import {useCallback, useEffect, useState} from "react";
import {getUnpublishedDevlogsByUser} from "../api/devlogs.js";

export default function useUnpublishedDevlogs() {
    const [devlogs, setDevlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevlogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getUnpublishedDevlogsByUser();
            setDevlogs(Array.isArray(data) ? data : (data.devlogs ?? data.data ?? []));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDevlogs();
    }, [fetchDevlogs]);

    return { devlogs, loading, error, refresh: fetchDevlogs };
}