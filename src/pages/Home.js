import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { getAPIURL } from "../utils";

export function Home() {
    const user = useContext(AuthContext);

    return (
        <div className="flex flex-col justify-start items-center text-white min-h-screen p-16 pt-12 bg-hackbca-dark-blue">
            <h1 className="text-6xl font-bold mb-3 fancy-text text-center">Get ready for hackBCA!</h1>
            <div className="container flex justify-center items-center">
                <img src="/pheonix.png" className="h-96 mr-12" />
                <div className="bg-hackbca-less-dark-blue p-5 rounded-lg max-w-prose">
                    <h2 className="text-xl font-medium mb-3">MM DD-DD 20XX @ BCA</h2>
                    <p className="mb-1">hackBCA will return soon!</p>
                    <p className="mb-1">Visit frequently to see updates, including planned events and projects from other attendees.</p>
                    <p className="mb-3">Log in with Google to register, plan your schedule, and propose or volunteer for projects.</p>
                    <p><Link to="/projects" className="font-bold text-hackbca-orange hover:text-hackbca-orange-dark transition-colors">See what's being built (Projects)</Link></p>
                    {!user && <p className="mt-3"><a href={`${getAPIURL()}/login/google`} className="font-bold text-hackbca-orange hover:text-hackbca-orange-dark transition-colors">Sign in with Google</a></p>}
                </div>
            </div>
        </div>
    )
}