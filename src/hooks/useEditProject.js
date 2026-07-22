import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProject} from "../api/projects.js";

export default function useEditProject() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({projectId, project}) => updateProject(projectId, project),
        onSuccess: (updatedProject) => {
            queryClient.invalidateQueries(['projects'])
            if (updatedProject && updatedProject.id) {
                queryClient.invalidateQueries(['project', updatedProject.id])
            }
        },
    })
}