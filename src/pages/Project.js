/// <reference path="../typings.d.ts" />

import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faCalendar, faExternalLinkAlt, faCircleNotch, faClock } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from "react";
import { formatDateProposed, formatTime } from "../formatting";

/**
 * Contents for a project.
 * @param {Object} props
 * @param {Project} props.project project to display
 */
function ProjectContent({project}) {
    return (
        <>
            <div className="flex flex-col sm:flex-row flex-wrap sm:items-end">
                <div>
                    <div className="flex flex-row flex-wrap items-center space-x-2 mb-1">
                        <h1 className="text-3xl font-bold">{project.name}</h1>
                        <p className="italic">({project.type})</p>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={project.owner.length == 1 ? faUser : faUsers} />
                        <p className="italic">{project.owner.join(", ")}</p>
                    </div>
                </div>
                <div className="sm:flex-grow" />
                <div className="flex flex-row items-center space-x-1 mr-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    <p>{formatDateProposed(new Date(project.date_proposed))}</p>
                </div>
                <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{formatTime(new Date(project.time))}</p>
                </div>
            </div>
            <hr className="my-1" />
            <div>
                <p className="italic">Description:</p>
                <div className="whitespace-pre-wrap">
                    {project.description}
                </div>
            </div>
            <div className="flex flex-row flex-wrap mt-1">
                {project.github && <div className="flex flex-row items-center space-x-1 mr-2">
                    <FontAwesomeIcon icon={faGithub} />
                    <a href={project.github} className="italic underline text-blue-500">{project.github}</a>
                </div>}
                {project.url && <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    <a href={project.url} className="italic underline text-blue-500">{project.url}</a>
                </div>}
            </div>
        </>
    );
}

export function Project() {
    const { id } = useParams();
    console.log(id);
    /** @type {Project} */
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8000/projects/${encodeURIComponent(id)}`);
            if (response.status === 404) {
                setProject(null);
                setError(new Error("Project not found"));
            } else {
                const data = await response.json();
                setProject(data);
                setError(null);
            }
        } catch (e) {
            setError(e);
        }
    }, []);

    const loading = !project && !error;

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                {project && <ProjectContent project={project} />}
                {error && <div className="text-red-500"><strong>Error:</strong> {error.message}</div>}
                {loading && <div className="text-gray-500 animate-pulse"><FontAwesomeIcon icon={faCircleNotch} spin /> Loading project...</div>}
            </div>
        </div>
    )
}