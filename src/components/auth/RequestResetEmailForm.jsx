import {useState} from "react";
import usePageTitle from "../../hooks/usePageTitle.js";
import useRequestResetEmail from "../../hooks/useRequestResetEmail.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";

export function RequestResetEmailForm() {
    const [email, setEmail] = useState("")
    const {mutate, isPending, error, isSuccess} = useRequestResetEmail()
    usePageTitle("Request password reset")
    const handleSubmit = (e) => {
        e.preventDefault()
        mutate({email: email})
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Request a password reset</h2>

            <p>Email of the account</p>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br/>

            <Button disabled={isPending} type="submit">
                {isPending ? "Sending.." : "Send password reset email"}
            </Button>

            {isSuccess && <p>Email send! Check your inbox in a couple minutes.</p>}
            {error && <p>{error.message}</p>}
        </form>
    )
}