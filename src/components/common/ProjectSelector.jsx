import {useState} from "react";
import MultiPicker from "./MultiPicker.jsx";

export default function ProjectSelector({wakaProjects, hackaProjects, allProjects, onRequestChange}) {
    const [selectedProjects, setSelectedProjects] = useState([])

    const getProvider = (projectName) => {
        if (Array.isArray(wakaProjects) && wakaProjects.includes(projectName)) return "wakatime"
        if (Array.isArray(hackaProjects) && hackaProjects.includes(projectName)) return "hackatime"
        return "unknown"
    }

    const handleChange = (projects) => {
        setSelectedProjects(projects)
        onRequestChange?.({
            time_tracking_projects: projects.map((projectName) => ({
                name: projectName,
                provider: getProvider(projectName)
            }))
        })
    }

    return (
        <MultiPicker
            options={allProjects || []}
            selectedValues={selectedProjects}
            onChange={setSelectedProjects}
        />
    )
}