import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProject} from "../api/projects.js";

export default function useCreateProject() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProject,
        onSuccess: (newProject) => {
            queryClient.invalidateQueries(['projects'])
        },
    })
}