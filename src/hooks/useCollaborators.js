import {useQuery} from "@tanstack/react-query";
import {viewCollaborators} from "../api/collaborator.js";

export default function useCollaborators(projectId, options={}) {
    return useQuery({
        queryKey: ['collaborators', projectId],
        queryFn: () => viewCollaborators(projectId),
        enabled: !!projectId,
        staleTime: 1000 * 60,
        ...options
    })
}