import {useMutation, useQueryClient} from "@tanstack/react-query";
import {unpublishDevlog} from "../api/devlogs.js";

export default function useUnpublishDevlog() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({projectId, devlogId}) => unpublishDevlog(projectId, devlogId),
        onSuccess: (unpublishedDevlog) => {
            if (unpublishedDevlog?.project_id) {
                queryClient.invalidateQueries(['devlogs', unpublishedDevlog])
            } else {
                queryClient.invalidateQueries(['devlogs'])
            }
        }
    })
}