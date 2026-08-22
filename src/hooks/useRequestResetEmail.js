import {useMutation, useQueryClient} from "@tanstack/react-query";
import {requestResetEmail} from "../api/auth.js";

export default function useRequestResetEmail() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({email}) => requestResetEmail(email),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['me']})
        }
    })
}