import {useMutation, useQueryClient} from "@tanstack/react-query";
import {uploadAvatar} from "../api/auth.js";

export default function useUploadAvatar() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({formData}) => uploadAvatar(formData),
        onSuccess: (res) => {
            const url =
                res?.url ||
                res?.result?.url ||
                (Array.isArray(res?.result?.files) && res.result.files[0]?.url) ||
                null

            if (url) {
                queryClient.setQueryData(['me'], (old) => {
                    if (!old) return old
                    return {...old, avatar_url: url, avatarUrl: url}
                })
            } else {
                queryClient.invalidateQueries(['me'])
            }
        },
    })
}