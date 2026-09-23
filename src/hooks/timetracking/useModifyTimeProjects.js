import {useMutation, useQueryClient} from "@tanstack/react-query";
import {modifyLinkedTimeProjects} from "../../api/timetracking.js";

export default function useModifyTimeProjects() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({projects, projectId}) => modifyLinkedTimeProjects(projects, projectId),
        onSuccess: (_updatedProject, {projectId}) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            if (projectId) {
                queryClient.invalidateQueries({queryKey: ['project', projectId]})
            }
        },
    })
}