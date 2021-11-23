import { faChevronCircleDown, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorMessage, Field, FieldArray, Formik, getIn } from "formik";
import { useLocation } from "react-router";

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

export function ProjectForm() {
    const { search } = useLocation();
    const update = new URLSearchParams(search).get("update");

    return (
        <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
            <Formik
                initialValues={{
                    name: "",
                    owner: [""],
                    date_proposed: "",
                    time: "",
                    type: "",
                    description: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values);
                        setSubmitting(false);
                    }, 500);
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
                            <FieldArray name="owner" render={({push, remove}) => (
                                <>
                                    {values.owner.map((owner, index) => {
                                        return <div className="mb-1">
                                            <div className="flex items-center" key={index}>
                                                {values.owner.length > 1 && <a className="text-gray-500 font-medium w-7" href="#" onClick={e => {
                                                    e.preventDefault();
                                                    remove(index);
                                                }}><FontAwesomeIcon icon={faMinusCircle} className="text-red-500" /><span className="sr-only">Delete</span></a>}
                                                <Field name={`owner.${index}`} type="text" placeholder="John Smith" className={`w-full bg-gray-100 rounded px-3 py-2 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-hackbca-orange focus:ring-opacity-75`} validate={owner => {
                                                    if (!owner) return "Who's the owner?";
                                                }} />
                                            </div>
                                            <ErrorMessage name={`owner.${index}`} component="div" className="mb-1 text-red-500" />
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
                                if (!date) return "A date is required.";
                            }} />
                            <span className="w-5" />
                            <FormGroup label="Time" name="time" type="time" validate={time => {
                                if (!time) return "A time is required.";
                            }} />
                        </div>
                        <FormSelect label="Type" name="type" validate={type => {
                            if (!type) return "We have types here, y'know. This isn't Python.";
                        }}>
                            <option disabled value="" hidden>Select one...</option>
                            <option value="software">Software</option>
                            <option value="hardware">Hardware</option>
                            <option value="blood">Blood Sacrifice</option>
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