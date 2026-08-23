import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "../api/auth.js";

export default function useResetPassword() {
    return useMutation({
        mutationFn: ({ email, password, verification_code }) =>
            resetPassword({ email, password, verification_code }),
    })
}