import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/auth.js";

export default function useUser(userId) {
    const query =  useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
        enabled: userId !== undefined && userId !== null
    })
    return {...query, user: query.data}
}