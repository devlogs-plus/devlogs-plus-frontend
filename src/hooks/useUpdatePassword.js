import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updatePassword} from "../api/auth.js";

export default function useUpdatePassword() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({passwords}) => updatePassword(passwords),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['me']})
        }
    })
}