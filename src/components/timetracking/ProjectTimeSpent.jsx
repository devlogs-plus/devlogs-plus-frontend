import {useProjectSecondsSpent} from "../../hooks/timetracking/useProjectSecondsSpent.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {makeSecondsReadable} from "../../helperFunctions.js";

export default function ProjectTimeSpent({projectId}) {
    const {data, isLoading, isError, error} = useProjectSecondsSpent(projectId)

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {error.message}</p>
    const extractSeconds = (d) => {
        if (typeof d === 'number') return d
        if (!d || typeof d !== 'object') return 0
        const keys = ['seconds_spent', 'seconds', 'total_seconds', 'total_time', 'secondsSpent']
        for (const k of keys) {
            if (typeof d[k] === 'number') return d[k]
            if (typeof d[k] === 'string' && /^\d+$/.test(d[k].trim())) return Number(d[k].trim())
        }
        if (d.data) return extractSeconds(d.data)
        const numericVals = Object.values(d).filter(v => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v.trim())))
        if (numericVals.length === 1) return Number(numericVals[0])
        return 0
    }

    const seconds = extractSeconds(data)
    const timeSpent = makeSecondsReadable(Number(seconds) || 0)

    return (
        <p>Time Spent: {timeSpent}</p>
    )
}