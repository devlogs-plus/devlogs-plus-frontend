import { useCallback, useEffect, useRef, useState } from "react";
import { getFeed, getSingleDevlog } from "../api/devlogs.js";

export default function useGetFeed({initialPage = 1, initialPerPage = 10, autoLoad = true, fetchDetails = true, failOnDetailError = false} = {}) {
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(Boolean(autoLoad))
    const [error, setError] = useState(null)
    const [page, setPage] = useState(initialPage)
    const [perPage, setPerPage] = useState(initialPerPage)
    const [total, setTotal] = useState(null)
    const fetchIdRef = useRef(0)

    const fetchFeed = useCallback(
        async (opts = {}) => {
            const thisFetchId = ++fetchIdRef.current
            const p = opts.page ?? page
            const pp = opts.per_page ?? opts.perPage ?? perPage

            setLoading(true)
            setError(null)

            try {
                const data = await getFeed({ page: p, per_page: pp })
                const minimal = Array.isArray(data) ? data : (data.devlogs ?? data.data ?? [])
                const newPage = data?.page ?? p
                const newPerPage = data?.per_page ?? data?.perPage ?? pp
                const newTotal = data?.total ?? null

                if (!fetchDetails || minimal.length === 0) {
                    if (fetchIdRef.current === thisFetchId) {
                        setFeed(minimal)
                        setPage(newPage)
                        setPerPage(newPerPage)
                        setTotal(newTotal)
                    }
                    return
                }

                const detailPromises = minimal.map(item => {
                    const projectId = item?.project?.id
                    const devlogId = item?.id
                    if (projectId == null || devlogId == null) {
                        return Promise.reject(new Error("Missing project or devlog id for detail fetch"))
                    }
                    return getSingleDevlog(projectId, devlogId)
                })

                const settled = await Promise.allSettled(detailPromises)


                if (failOnDetailError) {
                    const firstRej = settled.find(s => s.status === "rejected")
                    if (firstRej) throw firstRej.reason
                }
                const merged = settled.map((s, idx) => {
                    if (s.status === "fulfilled") return s.value
                    return { ...minimal[idx], _detailError: s.reason }
                })

                if (fetchIdRef.current === thisFetchId) {
                    setFeed(merged)
                    setPage(newPage)
                    setPerPage(newPerPage)
                    setTotal(newTotal)
                }
            } catch (err) {
                if (fetchIdRef.current === thisFetchId) {
                    setError(err)
                }
            } finally {
                if (fetchIdRef.current === thisFetchId) {
                    setLoading(false)
                }
            }
        },
        [page, perPage, fetchDetails, failOnDetailError]
    );

    useEffect(() => {
        if (autoLoad) fetchFeed()
    }, [fetchFeed, autoLoad])

    const refresh = useCallback(() => fetchFeed(), [fetchFeed])
    const goToPage = useCallback(n => setPage(n), [])
    const nextPage = useCallback(() => setPage(prev => (prev == null ? 2 : prev + 1)), [])
    const prevPage = useCallback(() => setPage(prev => (prev == null ? 1 : Math.max(1, prev - 1))), [])
    const setPerPageAndRefresh = useCallback(pp => setPerPage(pp), [])

    return {
        feed,
        loading,
        error,
        page,
        perPage,
        total,
        refresh,
        setPage: goToPage,
        nextPage,
        prevPage,
        setPerPage: setPerPageAndRefresh
    }
}