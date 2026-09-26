import {useProjectSecondsSpent} from "../../hooks/timetracking/useProjectSecondsSpent.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import {makeSecondsReadable} from "../../helperFunctions.js";

export default function ProjectTimeSpent({projectId}) {
    const {data, isLoading, isError, error} = useProjectSecondsSpent(projectId)

    const timeSpent = makeSecondsReadable(data.seconds_spent)

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <p>Time Spent: {timeSpent}</p>
    )
}