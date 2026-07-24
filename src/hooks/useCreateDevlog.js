import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDevlog } from "../api/devlogs.js";

export default function useCreateDevlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDevlog,
        onSuccess: (newDevlog) => {
            if (newDevlog?.project_id) {
                queryClient.invalidateQueries(["devlogs", newDevlog.project_id]);
            } else {
                queryClient.invalidateQueries(["devlogs"]);
            }
        },
    });
}