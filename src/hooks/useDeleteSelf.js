import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSelf} from "../api/auth.js";

export default function useDeleteSelf() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteSelf,
        onSuccess: () => {
            queryClient.setQueryData(['me'], null)
            queryClient.removeQueries({queryKey: ['me']})
        }
    })
}