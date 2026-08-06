import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCollaborator} from "../api/collaborator.js";

export default function useAddCollaborator() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addCollaborator,
        onSuccess: (_newCollaborator, variables) => {
            const projectId = variables.projectId
            queryClient.invalidateQueries(['collaborators', projectId])
        }
    })
}