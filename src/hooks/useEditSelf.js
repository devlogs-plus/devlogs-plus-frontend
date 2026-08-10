import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editSelf} from "../api/auth.js";

export default function useEditSelf() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({user}) => editSelf(user),
        onSuccess: (editedSelf) => {
            queryClient.invalidateQueries({queryKey: ['users']})
            if (editedSelf?.userId) {
                queryClient.invalidateQueries({queryKey: ['user', editedSelf.id]})
            }
        }
    })
}