import usePageTitle from "../../hooks/usePageTitle.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useResetPassword from "../../hooks/useResetPassword.js";
import {Input} from "../common/Input.jsx";
import {Button} from "../common/Button.jsx";

export function ResetPasswordForm() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const emailFromUrl = searchParams.get("email") ?? ""
    const codeFromUrl = searchParams.get("code") ?? ""
    const [form, setForm] = useState({
        password: "",
        confirm_password: ""
    })
    usePageTitle("Reset Password")
    useEffect(() => {}, [emailFromUrl, codeFromUrl]);
    const [fieldErrors, setFieldErrors] = useState({})
    const {mutate, isPending, error, isSuccess} = useResetPassword()

    const validate = () => {
        const errors ={}
        if (!form.password) errors.password = "Password is requiered"
        if (form.password.length < 8) errors.password = "Password must be at least 8 characters"
        if (form.password !== form.confirm_password) errors.confirm_password = "Passwords must match"
        if (!emailFromUrl) errors.email = "Email is missing from the url, trying clicking the link again"
        if (!codeFromUrl) errors.verification_code = "Code is missing from the url, trying clicking the url again"
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        const payload = {
            "email": emailFromUrl,
            "password": form.password,
            "verification_code": codeFromUrl
        }
        mutate(payload, {
            onSuccess: () => {
                navigate("/login", {replace: true})
            }
        })
    }
    const missingParams = !emailFromUrl || !codeFromUrl

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset your Password</h2>

            {missingParams ? (
                <div style={{color: "#bf616a"}}>
                    <p>The resent link is missing required params (email or code). Please click the link from the email or request a new email.</p>
                </div>
            ) : (
                <div>
                    <p>Resetting password for {emailFromUrl}</p>
                </div>
            )}

            <p>New password:</p>
            <Input value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} type="password"/>
            {fieldErrors.password && <div style={{color: "#bf616a"}}>{fieldErrors.password}</div> }

            <p>Confirm password:</p>
            <Input value={form.confirm_password} onChange={(e) => setForm({...form, confirm_password: e.target.value})} type="password"/>
            {fieldErrors.confirm_password && <div style={{color: "#bf616a"}}>{fieldErrors.confirm_password}</div> }

            <br/>

            <Button disabled={isPending || missingParams} type="submit">
                {isPending ? "Resetting.." : "Reset password"}
            </Button>

            {isSuccess && <p>Password set. Redirecting..</p>}
            {error && <p style={{color: "#bf616a"}}>{error.message}</p>}
            {fieldErrors.email && <div style={{ color: "#bf616a" }}>{fieldErrors.email}</div>}
            {fieldErrors.verification_code && <div style={{ color: "#bf616a" }}>{fieldErrors.verification_code}</div>}
        </form>
    )
}