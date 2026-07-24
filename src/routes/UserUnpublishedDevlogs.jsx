import { useAuth } from "../context/AuthContext.jsx";
import useUnpublishedDevlogs from "../hooks/useUnpublishedDevlogs.js";
import {DevlogsCard} from "../components/devlogs/DevlogsCard.jsx";
import {UnauthorizedRoute} from "../components/common/UnauthorizedRoute.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import usePublishDevlog from "../hooks/usePublishDevlog.js";
import {useState} from "react";

export function UserUnpublishedDevlogs() {
    const { user, isLoading: authLoading } = useAuth();

    if (authLoading) return <LoadingSpinner/>;

    if (!user) return <UnauthorizedRoute/>

    const { devlogs = [], loading, error, refresh } = useUnpublishedDevlogs();
    const publishMutation = usePublishDevlog()
    const [publishingId, setPublishingId] = useState(null)

    if (loading) return <div>Loading devlogs...</div>;
    if (error) return <div>Error: {String(error.message)}</div>;
    if (!devlogs.length) return <div>No unpublished devlogs</div>;

    async function handlePublish(devlog) {
        // devlog is expected to include `id` and `project_id`
        const projectId = devlog.project_id ?? devlog.projectId;
        const devlogId = devlog.id;
        if (!projectId || !devlogId) {
            console.error("Missing projectId or devlogId on devlog:", devlog);
            alert("Cannot publish: missing identifiers.");
            return;
        }

        try {
            setPublishingId(devlogId);
            await publishMutation.mutateAsync({ projectId, devlogId });
            // refresh the unpublished list so the published item disappears
            await refresh();
        } catch (err) {
            console.error("Publish failed", err);
            // lightweight user feedback; replace with your toast mechanism if you have one
            alert("Failed to publish devlog: " + (err?.message || String(err)));
        } finally {
            setPublishingId(null);
        }
    }

    return (
        <>
            <h1>Unpublished Devlogs</h1>
            {devlogs.map(d => (
                <div key={d.id} style={{ marginBottom: 12 }}>
                    <DevlogsCard devlog={d} />
                    <div style={{ marginTop: 6 }}>
                        <button
                            onClick={() => handlePublish(d)}
                            disabled={publishingId === d.id || publishMutation.isLoading}
                        >
                            {publishingId === d.id ? "Publishing..." : "Publish"}
                        </button>
                    </div>
                </div>
            ))}
            <div> <button onClick={refresh}>Refresh</button> </div>
        </>
    );
}

export default UserUnpublishedDevlogs;