import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getMe, login, logout} from "../api/auth.js";

export function useCurrentUser() {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: false
    })
}

export function useLogin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            queryClient.setQueryData(['me'], user)
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(['me'], null)
        }
    })
}