import { useAuth } from "../context/AuthContext.jsx";
import useUnpublishedDevlogs from "../hooks/useUnpublishedDevlogs.js";
import {DevlogsCard} from "../components/devlogs/DevlogsCard.jsx";
import {UnauthorizedRoute} from "../components/common/UnauthorizedRoute.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import usePublishDevlog from "../hooks/usePublishDevlog.js";
import {useState} from "react";
import ErrorPage from "../components/common/ErrorPage.jsx";
import useEditDevlog from "../hooks/useEditDevlog.js";
import {Link} from "react-router-dom";

export function UserUnpublishedDevlogs() {
    const { user, isLoading: authLoading } = useAuth();

    if (authLoading) return <LoadingSpinner/>;

    if (!user) return <UnauthorizedRoute/>

    const { devlogs = [], loading, error, refresh } = useUnpublishedDevlogs();
    const publishMutation = usePublishDevlog()
    const editMutation = useEditDevlog()
    const [publishingId, setPublishingId] = useState(null)

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>
    if (!devlogs.length) return <div>No unpublished devlogs</div>

    async function handlePublish(devlog) {
        const projectId = devlog.project_id ?? devlog.projectId
        const devlogId = devlog.id
        if (!projectId || !devlogId) {
            alert("Cannot publish: missing identifiers.")
            return
        }

        try {
            setPublishingId(devlogId)
            await publishMutation.mutateAsync({ projectId, devlogId })
            await refresh()
        } catch (err) {
            console.error("Publish failed", err)
            alert("Failed to publish devlog: " + (err?.message || String(err)))
        } finally {
            setPublishingId(null)
        }
    }

    return (
        <>
            <h1>Unpublished Devlogs</h1>
            {devlogs.map(d => (
                <div key={d.id}>
                    <DevlogsCard devlog={d} />
                    <div>
                        <button onClick={() => handlePublish(d)} disabled={publishingId === d.id || publishMutation.isLoading}>
                            {publishingId === d.id ? "Publishing..." : "Publish"}
                        </button>
                        <Link to={`/projects/${d.project_id ?? d.projectId}/devlogs/${d.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                </div>
            ))}
            <div> <button onClick={refresh}>Refresh</button> </div>
        </>
    );
}

export default UserUnpublishedDevlogs;