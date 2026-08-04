import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleDevlog} from "../../api/devlogs.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import NotFoundPage from "../common/NotFoundPage.jsx";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export function DevlogPage() {
    const {projectId, devlogId} = useParams()
    const {user} = useAuth()
    const [devlog, setDevlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true

        const fetchDevlog = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getSingleDevlog(projectId,devlogId)
                if (mounted) setDevlog(data)
            } catch (err) {
                if (mounted) setError(err)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchDevlog()
        return () => {
            mounted = false
        }
    }, [projectId, devlogId]);

    if (loading) return <LoadingSpinner/>
    if (error) return <ErrorPage message={error.message}/>
    if (!devlog) return <NotFoundPage/>

    const {title, body_markdown: bodyMarkdown, published_at: published, author_user_id: ownerId} = devlog
    const isOwner = user && user.id === ownerId

    return (
        <>
            <h1>{title}</h1>
            <div className="devlogBody">
                <MarkdownRenderer content={bodyMarkdown}/>
            </div>
            <p>-----------------------------------</p>
            <p>Published {published}</p>
            <p>project id: {projectId}</p>
            <p>devlog id: {devlogId}</p>
            {isOwner && (
                <Link to={`/projects/${projectId}/devlogs/${devlogId}/edit`}>
                    <button>Edit Devlog</button>
                </Link>
            )}
            {isOwner && (
                <Link to={`/projects/${projectId}/devlogs/${devlogId}/unpublish`}>
                    <button>Unpublish Devlog</button>
                </Link>
            )}
        </>
    )
}

export default DevlogPage