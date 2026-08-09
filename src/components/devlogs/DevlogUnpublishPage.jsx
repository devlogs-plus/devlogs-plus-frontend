import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {getSingleDevlog, unpublishDevlog} from "../../api/devlogs.js";
import {parseApiError} from "../../api/client.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import {UnauthorizedRoute} from "../common/UnauthorizedRoute.jsx";
import {Button} from "../common/Button.jsx";

export function DevlogUnpublishPage() {
    const {projectId, devlogId} = useParams()
    const navigate = useNavigate()
    const {user} = useAuth()
    const [devlog, setDevlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [unpub, setUnpub] = useState(false)
    const [error, setError] = useState(null)
    const [ownerId, setOwnerId] = useState(null)

    useEffect(() => {
        let mounted = true
        getSingleDevlog(projectId, devlogId)
            .then((devlog) => {
                if (!mounted) return
                setDevlog(devlog)
                setOwnerId(devlog.author_user_id)
                setLoading(false)
            })
            .catch((err) => {
                if (!mounted) return
                setError(err.message)
                setLoading(false)
            })
        return () => {mounted = false}
    }, [projectId, devlogId]);

    async function handleUnpub() {
        if (!window.confirm(`Are you sure you want to unpublish this devlog? You can republish it later`)) {
            return
        }

        setUnpub(true)
        setError(null)

        try {
            await unpublishDevlog(projectId, devlogId)
            navigate(`/projects/${projectId}`)
        } catch (err) {
            const parsed = parseApiError(err)
            setError(parsed.message)
            setUnpub(false)
        }
    }

    const currentUserId = user?.id
    if (loading) return <LoadingSpinner/>
    if (error && !devlog) return <ErrorPage message={error.message}/>
    if (ownerId !== currentUserId) return <UnauthorizedRoute/>

    return (
        <div className="devlogUnpubPage">
            <h2>Unpublish Devlog</h2>
            {error && <p className="error">{error}</p> }

            <div className="unpubWarning">
                <p>Devlog: {devlog?.title}</p>
                <p>You can republish this later at</p> <Link to="/devlogs/unpublished">Unpublished Devlogs</Link>
            </div>

            <Button onClick={handleUnpub} disabled={unpub}>
                {unpub ? "Unpublishing.." : "Unpublish Devlog"}
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}