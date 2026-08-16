import {useState} from "react";
import useDeleteSelf from "../../hooks/useDeleteSelf.js";
import {useNavigate} from "react-router-dom";
import {Button} from "../common/Button.jsx";
import {Input} from "../common/Input.jsx";
import usePageTitle from "../../hooks/usePageTitle.js";

export default function DeleteSelfPage() {
    const [confirm, setConfirm] = useState("")
    const del = useDeleteSelf()
    const navigate = useNavigate()
    usePageTitle("Delete Account")

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