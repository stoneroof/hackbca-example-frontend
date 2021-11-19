/// <reference path="../typings.d.ts" />

import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faCalendar, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { names } from "../data/names";
import { useEffect, useState } from "react";

function seed_rand(seed) {
    // https://stackoverflow.com/a/424445
    const m = 0x80000000; // 2**31;
    const a = 1103515245;
    const c = 12345;

    var state = seed ? seed : Math.floor(Math.random() * (m - 1));

    return function() {
        state = (a * state + c) % m;
        return state;
    }
}

function get_random_names(rand) {
    const res = [];
    const num_users = (rand() % 3) + 1;
    for (let i = 0; i < num_users; i++)
        res.push(names[rand() % names.length]);
    return [...new Set(res)];
}

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
                <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <p>{new Date(project.date_proposed).toLocaleDateString()} {new Date(project.time).toLocaleTimeString()}</p>
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
    /** @type {Project} */
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8000/project/${encodeURIComponent(id)}`);
            if (response.status === 404) {
                setError(new Error("Project not found"));
            } else {
                const data = await response.json();
                console.log(data);
                setProject(data);
            }
        } catch (e) {
            setError(e);
        }
    }, []);

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                {project && <ProjectContent project={project} />}
                {error && <div className="text-red-500 col-span-full"><strong>Error:</strong> {error.message}</div>}
            </div>
        </div>
    )
}