import {useCallback, useEffect, useState} from "react";
import {getFeed} from "../api/devlogs.js";

export default function useGetFeed({initialPage = 1, initialPerPage=10, autoLoad=true} ={}) {
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(Boolean(autoLoad))
    const [error, setError] = useState(null)
    const [page, setPage] = useState(initialPage)
    const [perPage, setPerPage] = useState(initialPerPage)
    const [total, setTotal] = useState(null)

    const fetchFeed = useCallback(
        async (opts ={}) => {
            const p = opts.page ?? page
            const pp = opts.per_page ?? opts.perPage ?? perPage

            setLoading(true)
            setError(null)

            try {
                const data = await getFeed({page:p, per_page:pp})
                const items = Array.isArray(data) ? data : (data.devlogs ?? data.data ?? [])
                setFeed(items)
                setPage(data?.page ?? p)
                setPerPage(data?.per_page ?? data?.perPage ?? pp)
                setTotal(data?.total ?? null)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        },
        [page, perPage]
    )

    useEffect(() => {
        if (autoLoad) fetchFeed()
    }, [fetchFeed, autoLoad]);

    const refresh = useCallback(() => fetchFeed(), [fetchFeed])
    const goToPage = useCallback(n => setPage(n), [])
    const nextPage = useCallback(() => setPage(prev => (prev == null ? 2 : prev + 1)), [])
    const prevPage = useCallback(() => setPage(prev => (prev == null ? 1 : Math.max(1, prev - 1))), [])
    const setPerPageAndRefresh = useCallback(pp => setPerPage(pp), [])

    return {
        feed, loading, error, page, perPage, total, refresh, setPage: goToPage, nextPage, prevPage, setPerPage: setPerPageAndRefresh
    }

}