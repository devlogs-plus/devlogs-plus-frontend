import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {editSelf} from "../../api/auth.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";
import useUploadAvatar from "../../hooks/useUploadAvatar.js";
import AvatarImg from "../common/AvatarImg.jsx";
import {useQueryClient} from "@tanstack/react-query";
import usePageTitle from "../../hooks/usePageTitle.js";

export function EditOwnUser() {
    const {user, isLoading} = useAuth()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [displayName, setDisplayName] = useState(user?.display_name ?? "")
    const [email, setEmail] = useState(user?.email ?? "")
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url ?? "")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const upload = useUploadAvatar()
    const queryClient = useQueryClient()
    usePageTitle("Edit Account")

    if (isLoading) return <LoadingSpinner/>
    if (!user) return <Navigate to="/login" replace/>

    function isValidImageUrl(url) {
        return /\.(jpg|jpeg|png)$/i.test(url)
    }

    async function handleFileUpload(event) {
        const file = event.target.files?.[0]
        if (!file) return

        if (!isValidImageUrl(file.name)) {
            setError("Avatar must be a jpg or png")
            return
        }

        try {
            setError("")
            const formData = new FormData()
            formData.append('file', file)
            const res = await upload.mutateAsync({formData})
            const url = res?.url || res?.result?.url || (Array.isArray(res?.result?.files) && res.result.files[0]?.url) || null

            if (!url) {
                setError("cdn did not provide any url, try again")
                return
            }

            setAvatarUrl(url)
        } catch (err) {
            setError(err.message || "Failed to update avatar")
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        if (!avatarUrl) {
            setError("Avatar Url is required")
            return
        }
        setSaving(true)

        try {
            await editSelf({
                "display_name": displayName,
                "email": email,
                "avatar_url": avatarUrl
            })
            await queryClient.invalidateQueries({queryKey: ['me']})
            navigate("/me")
        } catch (err) {
            setError(err.message || "failed to edit profile, try again in 5mins")
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

            <p>Avatar</p>
            <div>
                <Input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileUpload} disabled={upload.isPending} style={{display: 'none'}}/>
                <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={upload.isPending || saving}>{upload.isPending ? "Uploading.." : "Upload Avatar"}</Button>
            </div>
            <p>Preview:</p>
            <AvatarImg user={{...user, avatar_url: avatarUrl}}/>
            <br/>

            {error && <p className="error">{error}</p>}
            <Button type="submit" disabled={saving} onClick={(event) => handleSubmit(event)}>{saving ? "Saving..":"Save changes"}</Button>
            <Button type="button" onClick={() => {
                queryClient.invalidateQueries({queryKey: ['me']})
                navigate(-1)
            }} disabled={saving}>Cancel</Button>
        </div>
    )
}

export default EditOwnUser