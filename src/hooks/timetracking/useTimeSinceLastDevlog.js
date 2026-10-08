import {useQuery} from "@tanstack/react-query";
import {getTimeSinceLastDevlog} from "../../api/timetracking.js";

export default function useTimeSinceLastDevlog(projectId) {
    return useQuery({
        queryKey: ["project-time-since-devlog", projectId],
        queryFn: () => getTimeSinceLastDevlog(projectId),
        enabled: Boolean(projectId)
    })
}