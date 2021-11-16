import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Navbar() {
    return <nav className="bg-hackbca-dark-blue text-white h-16 px-5 py-2 flex items-center">
        <Link to="/" className="block h-full whitespace-nowrap hover:opacity-80 transition-opacity">
            <img className="inline h-full mr-3 align-middle" src="/pheonix.png" alt="hackBCA Logo" />
            <span className="text-2xl font-bold align-middle">hackBCA 20XX</span>
        </Link>
        <span className="flex-grow" />
        <Link to="/projects" className="hover:opacity-80 transition-opacity"><FontAwesomeIcon className="mr-1" icon={faWrench} /> Projects</Link>
        <a
            href="https://www.youtube.com/watch?v=iik25wqIuFo"
            className="ml-3 hover:opacity-80 bg-hackbca-orange bg-gradient-to-tr from-hackbca-blue to-hackbca-orange-dark text-white font-medium py-2 px-4 rounded transition-all hover:bg-hackbca-orange-dark focus:bg-hackbca-orange-dark focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75">
            Login/Register
        </a>
    </nav>
}
