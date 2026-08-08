import useDevlogs from "../../hooks/useDevlogs.js";
import {useState} from "react";
import {DevlogsCard} from "./DevlogsCard.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {Button} from "../common/Button.jsx";

export function ViewDevlogs({projectId}) {
    const {devlogs = [], loading, error, refresh} = useDevlogs({projectId})
    const [page, setPage] = useState(1)

    const PER_PAGE = 10
    const totalPages = Math.max(1, Math.ceil(devlogs.length/ PER_PAGE))
    const startIndex = (page-1) * PER_PAGE
    const visible = devlogs.slice(startIndex, startIndex+PER_PAGE)

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>
    if (!devlogs.length) return <div>No devlogs for this project yet</div>

    return (
        <>
            {visible.map((d) => (
                <DevlogsCard key={d.id} devlog={d}/>
            ))}
            <div>
                <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                </Button>
                <Button onClick={refresh}>
                    Refresh
                </Button>
            </div>
        </>
    )
}

export default ViewDevlogs