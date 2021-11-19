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

interface Project {
    name: string;
    owner: string[];
    date_proposed: string;
    time: string;
    description?: string;
    github?: string;
    url?: string;
    type: string;
}