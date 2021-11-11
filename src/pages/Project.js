import { useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { names } from "../data/names";

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

export function Project() {
    const { id } = useParams();
    const rand = seed_rand(id);
    const names = get_random_names(rand);

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                <h1 className="text-3xl font-bold">Project {id}</h1>
                <div className="flex flex-row items-center space-x-1">
                    <FontAwesomeIcon icon={names.length == 1 ? faUser : faUsers} />
                    <p className="italic">{names.join(", ")}</p>
                </div>
                <hr />
                <div>
                    <p className="italic">Description</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                    </p>
                </div>
            </div>
        </div>
    )
}