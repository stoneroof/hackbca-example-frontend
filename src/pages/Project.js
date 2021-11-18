import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faCalendar, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { names } from "../data/names";

/**
 * @typedef {object} Project
 * @property {string} name
 * @property {string[]} owner
 * @property {string} date_proposed
 * @property {string} time
 * @property {string} [description]
 * @property {string} [github]
 * @property {string} [url]
 * @property {string} type
 */

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
 * @param {Project} project project to display
 */
function ProjectContent(project) {
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
                    <p>{project.date_proposed} {project.time}</p>
                </div>
            </div>
            <hr className="my-1" />
            <div>
                <p className="italic">Description:</p>
                <p>
                    {project.description}
                </p>
            </div>
            <div className="flex flex-row flex-wrap mt-1">
                <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={faGithub} />
                    <a href="https://www.youtube.com/watch?v=iik25wqIuFo" className="italic underline text-blue-500">https://example</a>
                </div>
                <div className="w-2" />
                <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    <a href="https://www.youtube.com/watch?v=iik25wqIuFo" className="italic underline text-blue-500">https://example</a>
                </div>
            </div>
        </>
    );
}

export function Project() {
    const { id } = useParams();
    const rand = seed_rand(id);
    const names = get_random_names(rand);

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                
            </div>
        </div>
    )
}