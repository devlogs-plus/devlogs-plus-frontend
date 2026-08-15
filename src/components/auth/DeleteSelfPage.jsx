import {useState} from "react";
import useDeleteSelf from "../../hooks/useDeleteSelf.js";
import {useLogout} from "../../hooks/useAuth.js";
import {replace, useNavigate} from "react-router-dom";
import ErrorPage from "../common/ErrorPage.jsx";
import {Button} from "../common/Button.jsx";
import {Input} from "../common/Input.jsx";

export default function DeleteSelfPage() {
    const [confirm, setConfirm] = useState("")
    const del = useDeleteSelf()
    const logout = useLogout()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        if (confirm !== "DELETE") return
        del.mutate(null, {
            onSuccess: () => {
                navigate("/", {replace: true})
            }
        })
    }

    return (
        <div>
            <h1>Delete Account</h1>
            {del.isError && <p style={{color:"crimson"}}>{del.error?.message ?? "Delete fail"}</p> }
            <p style={{color: "crimson"}}>This is permanent. All your data will be removed. Type "DELETE" to confirm.</p>
            <form onSubmit={handleDelete}>
                <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type DELETE to confirm"/>

                <Button type="submit" disabled={confirm !== "DELETE" || del.isPending}>
                    {del.isPending ? "Deleting.." : "Delete my account"}
                </Button>
            </form>
        </div>
    )
}