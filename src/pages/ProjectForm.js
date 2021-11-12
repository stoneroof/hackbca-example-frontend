import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation } from "react-router";

function FormGroup({label, children}) {
    // TODO: Actually use label elements
    return <div className="flex-grow">
        <span className="block mt-3 font-medium text-gray-600">{label}</span>
        {children}
    </div>
}

export function ProjectForm() {
    const { search } = useLocation();
    const update = new URLSearchParams(search).get("update");

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <form className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                <h1 className="text-5xl font-bold fancy-text w-max max-w-full pb-2">{update ? "Update Project" : "Add New Project"}</h1>
                <FormGroup label="Name">
                    <input type="text" className="w-full bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75" placeholder="My Great Project" />
                </FormGroup>
                <FormGroup label="Owner">
                    <input type="text" className="w-full bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75" placeholder="A screaming Edward (and a Sasha looking confusedly at him)" />
                </FormGroup>
                <div className="flex w-full">
                    <FormGroup label="Date Proposed">
                        <input type="date" className="w-full bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75" />
                    </FormGroup>
                    <span className="w-5" />
                    <FormGroup label="Time">
                        <input type="time" className="w-full bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75" />
                    </FormGroup>
                </div>
                <FormGroup label="Type">
                    <div className="relative">
                        <select className="w-full appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75">
                            <option disabled selected hidden>Select one...</option>
                            <option value="software">Software</option>
                            <option value="hardware">Hardware</option>
                            <option value="blood">Blood Sacrifice</option>
                        </select>
                        <FontAwesomeIcon className="text-gray-600 pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2" icon={faChevronCircleDown} />
                    </div>
                </FormGroup>
                <FormGroup label="Description">
                    <textarea className="w-full h-40 appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75" placeholder="Ǎ̸͖̦̩̬̄̓Ä̵̡͓̗͕̙́̀̑̋̄͊͐̉Â̶̳̜̻̝͍̙̯̤̫͊̔͝ͅA̶̛̲̖̾͐͑̽̈́̓͋̇͊Ă̴̱͙̠̘̻͕̺̽̉̆̌͛̂̌̒͜Ạ̶̛̥̻̙͇͓͓̫̺̪̩͈̪̈́̾͒́̈́̎͜A̴̝͓̟͇̰͒̀͐͊̉͠Ą̴͚̪͚̥͕͑̄̉́̽́͘A̸̢̩͈͉͕̞͙͈̩̔͋̽͐̀̈̅̑͜͠Ą̸̡͙̼͍̖͙̔̃̈́͗̽͆́͘͘͘͝͝A̵̢͔̳̰̙̖̽͋̈́̍͒̽̀̽̈͐͝ͅĂ̵̛̺̼͇̤͙̦͈͋̽́̔̅͋̓͆̔̂̏͝͠Ą̶̛̞̲͍͙̖͙̤̪̣̺̎͌̔̀͐̍̾̽̃̅̎͜A̸͕͕͉͎̺̔̐̅̑͊̽̓̎̈́͆̚͘͝Ä̵̙͔̜͓͕̭̭̰̯̼̮͙́̂̿͐́̌͘͝ͅͅ" />
                </FormGroup>
                <div className="mt-5 flex justify-end">
                    <button className="bg-hackbca-orange bg-gradient-to-tr from-hackbca-blue to-hackbca-orange-dark text-white font-medium py-2 px-4 rounded transition-all hover:bg-hackbca-orange-dark focus:bg-hackbca-orange-dark focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75">{update ? "Update" : "Add Project"}</button>
                </div>
            </form>
        </div>
    )
}