import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {editSelf} from "../../api/auth.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";

export function EditOwnUser() {
    const {user, isLoading} = useAuth()
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState(user?.display_name ?? "")
    const [email, setEmail] = useState(user?.email ?? "")
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url ?? "")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    if (isLoading) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace/>

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setSaving(true)

        try {
            await editSelf({
                "display_name": displayName,
                "email": email,
                "avatar_url": avatarUrl
            })
            navigate("/me")
        } catch (err) {
            setError(err.message || "failed to edit profile")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <h3>Edit Profile</h3>

            <p>Display Name</p>
            <Input type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required/>

            <p>Email</p>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>

            <p>Avatar Url</p>
            <Input type="url" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} required/>

            {error && <p className="error">{error}</p>}
            <Button type="submit" disabled={saving} onClick={(event) => handleSubmit(event)}>{saving ? "Saving..":"Save changes"}</Button>
            <Button type="button" onClick={() => navigate(-1)} disabled={saving}>Cancel</Button>
        </div>
    )
}

export default EditOwnUser