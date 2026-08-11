import useGetFeed from "../../hooks/useGetFeed.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {DevlogsCard} from "./DevlogsCard.jsx";
import {Button} from "../common/Button.jsx";

export function ViewFeed() {
    const {feed, loading, error, page, perPage, total, refresh, nextPage, prevPage, setPage} = useGetFeed({initialPage:1, initialPerPage:10})

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message ?? String(error)}/>

    return (
        <div>
            {feed.length === 0 ? (
                <div>No items in feed</div>
            ):(
                feed.map((d) => <DevlogsCard key={d.id} devlog={d}/>)
            )}
            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                <Button onClick={prevPage} disabled={!page || page <= 1}>Prev</Button>
                <Button onClick={nextPage} disabled={total != null && page * prevPage >= total}>Next</Button>
                <Button onClick={refresh}>Refresh</Button>
                <span>Page: {page ?? "-"} - Per page: {perPage ?? "-"} - Total {total ?? "-"}</span>
            </div>
        </div>
    )
}