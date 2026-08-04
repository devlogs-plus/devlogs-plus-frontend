import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateDevlog} from "../api/devlogs.js";

export default function useEditDevlog() {
    const queryClient = useQueryClient()
    return  useMutation({
        mutationFn: ({projectId, devlogId, devlog}) => updateDevlog(projectId,devlogId,devlog),
        onSuccess: (updatedDevlog) => {
            queryClient.invalidateQueries(['projects'])
            if (updatedDevlog?.projectId) {
                queryClient.invalidateQueries(['project', updatedDevlog.projectId])
            }
        }
    })
}