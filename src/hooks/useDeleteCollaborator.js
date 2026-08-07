import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCollaborator} from "../api/collaborator.js";

export default function useDeleteCollaborator() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({projectId, userId}) => deleteCollaborator({projectId, userId}),
        onSuccess: (_, {projectId}) => {
            queryClient.invalidateQueries(['collaborators', projectId])
        }
    })
}