import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleDevlog} from "../../api/devlogs.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import ErrorPage from "../common/ErrorPage.jsx";
import NotFoundPage from "../common/NotFoundPage.jsx";
import MarkdownRenderer from "../common/MarkdownRenderer.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import styles from "./DevlogPage.module.css"
import {Button} from "../common/Button.jsx";
import {UserCard} from "../auth/UserCard.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";

export function DevlogPage() {
    const {projectId, devlogId} = useParams()
    const {user} = useAuth()
    const [devlog, setDevlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    usePageTitle(devlog ? devlog.title : "Loading..");

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
            <h1 className={styles.title}>{title}</h1>
            <UserCard userId={ownerId}/>
            <p>-----------------------------------</p>
            <MarkdownRenderer content={bodyMarkdown}/>
            <p>-----------------------------------</p>
            <p className={styles.id}>Published {published}</p>
            <p className={styles.id}>project id: {projectId}</p>
            <p className={styles.id}>devlog id: {devlogId}</p>
            {isOwner && (
                <>
                <Link to={`/projects/${projectId}/devlogs/${devlogId}/edit`}>
                    <Button>Edit Devlog</Button>
                </Link>
                <Link to={`/projects/${projectId}/devlogs/${devlogId}/unpublish`}>
                    <Button>Unpublish Devlog</Button>
                </Link>
                </>
            )}
        </>
    )
}

export default DevlogPage