import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

export function GithubCallback() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['me']})
        const timer = setTimeout(() => {
            navigate('/', {replace: true})
        }, 1000)

        return () => clearTimeout(timer)
    }, [navigate, queryClient]);
    return <LoadingSpinner/>
}