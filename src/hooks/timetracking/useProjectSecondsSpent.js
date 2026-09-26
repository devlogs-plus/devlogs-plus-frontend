import {useQuery} from "@tanstack/react-query";
import {getProjectSecondsSpent} from "../../api/timetracking.js";

export function useProjectSecondsSpent(projectId) {
    return useQuery({
        queryKey: ["project-seconds-spent", projectId],
        queryFn: () => getProjectSecondsSpent(projectId),
        enabled: Boolean(projectId)
    })
}