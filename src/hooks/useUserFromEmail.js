import {useQuery} from "@tanstack/react-query";
import {getUserFromEmail} from "../api/auth.js";

export default function useUserFromEmail(userEmail) {
    const query = useQuery({
        queryKey: ["user", userEmail],
        queryFn: () => getUserFromEmail(userEmail),
        enabled: userEmail !== undefined && userEmail !== null
    })
    return {...query, user: query.data}
}