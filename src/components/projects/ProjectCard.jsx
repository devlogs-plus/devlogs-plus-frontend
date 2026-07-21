export function ProjectCard({ project }) {
    if (!project) {
        return null; // or show a placeholder
    }

    const {
        name,
        short_description: shortDescription,
        demo_url: demoUrl,
        repo_url: repoUrl,
    } = project;

    return (
        <div className="projectCard">
            <p>-----------------------</p>
            <h3>{name}</h3>
            <p>{shortDescription}</p>
            <p>Demo Url: {demoUrl}</p>
            <p>Repo Url: {repoUrl}</p>
            <p>-----------------------</p>
        </div>
    );
}
export default ProjectCard