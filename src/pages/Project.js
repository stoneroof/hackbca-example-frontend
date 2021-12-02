/// <reference path="../typings.d.ts" />

import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faCalendar, faExternalLinkAlt, faCircleNotch, faClock } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from "react";
import { formatDateProposed, formatTime } from "../formatting";
import { Link } from "react-router-dom";
import { getTypeLabel } from "../types";
import { getAPIURL } from "../utils";

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
                        <p className="italic">({getTypeLabel(project.type)})</p>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <FontAwesomeIcon icon={project.users.length == 1 ? faUser : faUsers} />
                        <p className="italic">{project.users.map(u => u.email).join(", ")}</p>
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
            <div className="mt-4">
                <Link to={`/projects/${project.id}/edit`} className="fancy-button">Edit</Link>
            </div>
        </>
    );
}

export function Project() {
    const { id } = useParams();
    /** @type {Project} */
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async () => {
        try {
            const response = await fetch(`${getAPIURL()}/projects/${encodeURIComponent(id)}`);
            if (response.status === 404 || response.status === 422) {
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