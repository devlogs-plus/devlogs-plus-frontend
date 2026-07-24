import {useMutation, useQueryClient} from "@tanstack/react-query";
import {publishDevlog} from "../api/devlogs.js";

export default function usePublishDevlog() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({projectId, devlogId}) => publishDevlog(projectId, devlogId),
        onSuccess: (publishedDevlog) => {
            if (publishedDevlog?.project_id) {
                queryClient.invalidateQueries(['devlogs', publishedDevlog])
            } else {
                queryClient.invalidateQueries(['devlogs'])
            }
        }
    })
}