import { faChevronCircleDown, faMinusCircle, faPlusCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getTypes } from "../types";

function FormGroup({label, name, errors, ...props}) {
    return <div className="flex-grow">
        <label htmlFor={name} className="block mt-3 font-medium text-gray-600">{label}</label>
        <Field name={name} {...props} className={`w-full appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75`} />
        <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
}

function FormSelect({ label, name, errors, ...props }) {
    return <div className="flex-grow">
        <label htmlFor={name} className="block mt-3 font-medium text-gray-600">{label}</label>
        <div className="relative">
            <Field as="select" name={name} {...props} className={`w-full appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75`} />
            <FontAwesomeIcon className="text-gray-600 pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2" icon={faChevronCircleDown} />
        </div>
        <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
}

function FormTextarea({label, name, errors, ...props}) {
    return <div className="flex-grow">
        <label htmlFor={name} className="block mt-3 font-medium text-gray-600">{label}</label>
        <Field as="textarea" name={name} {...props} className={`w-full appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75`} />
        <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
}

function UserDropdown({ index, users, error }) {
    let defaultOption;
    if (users) {
        defaultOption = "Select one...";
    } else if (error) {
        defaultOption = "Could not load users.";
    } else {
        defaultOption = "Loading users...";
    }

    return <div className="relative w-full">
        <Field as="select" name={`users.${index}`} className={`w-full appearance-none bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75`} validate={(user) => {
            if (!user) return "Who's the owner?";
        }}>
            <option disabled value="" hidden>{defaultOption}</option>
            {users?.map(({email, id}) => <option key={id} value={id}>{email}</option>)};
        </Field>
        <FontAwesomeIcon className="text-gray-600 pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2" icon={faChevronCircleDown} />
    </div>;
}

function prepareInput({date_proposed, time, ...values}) {
    const [hour, minute] = time.split(":").map(p => parseInt(p));
    const timeDate = new Date();
    timeDate.setHours(hour);
    timeDate.setMinutes(minute);
    timeDate.setSeconds(0);
    timeDate.setMilliseconds(0);
    const proposedDate = new Date();
    const [year, month, day] = date_proposed.split("-").map(p => parseInt(p));
    proposedDate.setFullYear(year);
    proposedDate.setMonth(month - 1);
    proposedDate.setDate(day);
    return {...values, time: timeDate.toISOString(), date_proposed: proposedDate.toISOString()};
}

function ProjectFormContent({update, project}) {
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    const [usersError, setUsersError] = useState(null);
    useEffect(async () => {
        try {
            const response = await fetch("http://localhost:8000/users");
            if (response.status === 200) {
                setUsers(await response.json());
            } else {
                throw new Error("BAD STATUS CODE");
            }
        } catch (e) {
            setUsersError(e);
        }
    }, []);

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <Formik
                initialValues={project ? {...project,
                    users: project.users.map(({id}) => id),
                    time: `${("0" + new Date(project.time).getHours()).slice(-2)}:${("0" + new Date(project.time).getMinutes()).slice(-2)}`,
                    date_proposed: `${new Date(project.date_proposed).getFullYear()}-${("0" + (new Date(project.date_proposed).getMonth() + 1)).slice(-2)}-${("0" + new Date(project.date_proposed).getDate()).slice(-2)}`,
                } : {
                    name: "",
                    users: [""],
                    date_proposed: "",
                    time: "",
                    type: "",
                    description: ""
                }}
                validate={({users}) => {
                    let errors = {users: []};
                    const existingUsers = new Map();
                    users.forEach((user, i) => {
                        if (existingUsers.has(user)) {
                            errors.users[existingUsers.get(user)] = "What, do you have a quantum cloning machine?";
                            errors.users[i] = "What, do you have a quantum cloning machine?";
                        } else {
                            existingUsers.set(user, i);
                        }
                    });
                    if (errors.users.length > 0) return errors;
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    if (update) {
                        const response = await fetch(`http://localhost:8000/projects/${update}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(prepareInput(values)),
                        });
                        if (response.status === 200) {
                            setSubmitting(false);
                            navigate(`/projects/${update}`);
                        } else {
                            setErrors({ description: "An error occurred while updating the project." });
                            setSubmitting(false);
                            console.error(`Got status code: ${response.status}`);
                        }
                    } else {
                        const response = await fetch("http://localhost:8000/projects", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(prepareInput(values)),
                        });
                        if (response.status === 200) {
                            const { id } = await response.json();
                            setSubmitting(false);
                            navigate(`/projects/${id}`);
                        } else {
                            setErrors({description: "An error occurred while adding the project."});
                            setSubmitting(false);
                            console.error(`Got status code: ${response.status}`);
                        }
                    }
                }}
            >
                {({values, errors, handleSubmit, isValidating, isSubmitting}) => {
                    return <form className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
                        <h1 className="text-5xl font-bold fancy-text w-max max-w-full pb-2">{update ? "Update Project" : "Add New Project"}</h1>
                        <FormGroup label="Name" name="name" type="text" placeholder="My Great Project" validate={name => {
                            if (!name) return "What, does your project not have a name?";
                        }} errors={errors} />
                        <div className="flex-grow">
                            <span className="block mt-3 font-medium text-gray-600">Owners</span>
                            <FieldArray name="users" render={({push, remove}) => (
                                <>
                                    {values.users.map((user, index) => {
                                        return <div key={index} className="mb-1">
                                            <div className="flex items-center" key={index}>
                                                {values.users.length > 1 && <a className="text-gray-500 font-medium w-7" href="#" onClick={e => {
                                                    e.preventDefault();
                                                    remove(index);
                                                }}><FontAwesomeIcon icon={faMinusCircle} className="text-red-500" /><span className="sr-only">Delete</span></a>}
                                                <UserDropdown index={index} users={users} error={usersError} />
                                            </div>
                                            <ErrorMessage name={`users.${index}`} component="div" className="mb-1 text-red-500" />
                                        </div>
                                    })}
                                    <div>
                                        <a className="text-gray-500 font-medium" href="#" onClick={e => {
                                            e.preventDefault();
                                            push("");
                                        }}>
                                            <span className="w-6 inline-block"><FontAwesomeIcon icon={faPlusCircle} className="text-green-500" /></span>
                                            Add Owner
                                        </a>
                                    </div>
                                </>
                            )} />
                        </div>
                        <div className="flex w-full">
                            <FormGroup label="Date Proposed" name="date_proposed" type="date" validate={date => {
                                if (!date) return "Beginning of the universe, eh?"; // 1970
                            }} />
                            <span className="w-5" />
                            <FormGroup label="Time" name="time" type="time" validate={time => {
                                if (!time) return "Did you forget when noon was?";
                            }} />
                        </div>
                        <FormSelect label="Type" name="type" validate={type => {
                            if (!type) return "We have types here, y'know. This isn't Python.";
                        }}>
                            <option disabled value="" hidden>Select one...</option>
                            {getTypes().map(({type, label}) => <option key={type} value={type}>{label}</option>)}
                        </FormSelect>
                        <FormTextarea label="Description" name="description" placeholder="Ǎ̸͖̦̩̬̄̓Ä̵̡͓̗͕̙́̀̑̋̄͊͐̉Â̶̳̜̻̝͍̙̯̤̫͊̔͝ͅA̶̛̲̖̾͐͑̽̈́̓͋̇͊Ă̴̱͙̠̘̻͕̺̽̉̆̌͛̂̌̒͜Ạ̶̛̥̻̙͇͓͓̫̺̪̩͈̪̈́̾͒́̈́̎͜A̴̝͓̟͇̰͒̀͐͊̉͠Ą̴͚̪͚̥͕͑̄̉́̽́͘A̸̢̩͈͉͕̞͙͈̩̔͋̽͐̀̈̅̑͜͠Ą̸̡͙̼͍̖͙̔̃̈́͗̽͆́͘͘͘͝͝A̵̢͔̳̰̙̖̽͋̈́̍͒̽̀̽̈͐͝ͅĂ̵̛̺̼͇̤͙̦͈͋̽́̔̅͋̓͆̔̂̏͝͠Ą̶̛̞̲͍͙̖͙̤̪̣̺̎͌̔̀͐̍̾̽̃̅̎͜A̸͕͕͉͎̺̔̐̅̑͊̽̓̎̈́͆̚͘͝Ä̵̙͔̜͓͕̭̭̰̯̼̮͙́̂̿͐́̌͘͝ͅͅ" />
                        <div className="mt-5 flex justify-end">
                            <button className="fancy-button" onClick={e => handleSubmit(e)} disabled={isValidating || isSubmitting}>{update ? "Update" : "Add Project"}</button>
                        </div>
                    </form>;
                }}
            </Formik>
        </div>
    )
}

export function NewProjectForm() {
    return <ProjectFormContent />;
}

export function UpdateProjectForm() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8000/projects/${encodeURIComponent(id)}`);
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

    return project ? <ProjectFormContent update={project.id} project={project} /> : <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
        <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
            {error && <div className="text-red-500"><strong>Error:</strong> {error.message}</div>}
            {loading && <div className="text-gray-500 animate-pulse"><FontAwesomeIcon icon={faCircleNotch} spin /> Loading project...</div>}
        </div>
    </div>;
}