import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "../api/auth.js";

export default function useResetPassword() {
    return useMutation({
        mutationFn: ({payload}) => resetPassword(payload)
    })
}