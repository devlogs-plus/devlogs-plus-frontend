import {useState} from "react";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";
import useUpdatePassword from "../../hooks/useUpdatePassword.js";
import usePageTitle from "../../hooks/usePageTitle.js";
import {useLogout} from "../../hooks/useAuth.js";

export function PasswordChangePage() {
    const [form, setForm] = useState({
        old_password: "",
        new_password: ""
    })
    const {mutate: updatePassword, isPending, error, isSuccess} = useUpdatePassword()
    const {mutate: logout} = useLogout()
    usePageTitle("Change Password")

    const handleSubmit = (e) => {
        e.preventDefault()
        updatePassword(form, {
            onSuccess: () => {
                logout()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Old Password:</p>
            <Input type="password" value={form.old_password} onChange={(e) => setForm({...form, old_password: e.target.value})}/>
            <br/>
            <p>New Password:</p>
            <Input type="password" value={form.new_password} onChange={(e) => setForm({...form, new_password: e.target.value})}/>
            <br/>
            <Button disabled={isPending} type="submit">
                {isPending ? "Changing.." : "Change password"}
            </Button>

            {isSuccess && <p>Password updated!</p>}
            {error && <p>{error.message}</p>}
        </form>
    )
}