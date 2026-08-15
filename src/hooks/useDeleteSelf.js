import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSelf} from "../api/auth.js";

export default function useDeleteSelf() {
    const queryClient = useQueryClient()
    return useMutation(deleteSelf, {
        onSuccess: () => {
            queryClient.invalidateQueries(['me'])
        }
    })
}