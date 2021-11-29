/// <reference path="../typings.d.ts" />

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatTime } from '../formatting';
import StyledModal from '../modals';
import { getTypeLabel } from '../types';

/**
 * A row for a
 * @param {Project} project project to display 
 * @param {function (Project)} onDelete callback to delete the project
 * @returns row to put in the table
 */
function ProjectRow({project, onDelete}) {
  return (
    <>
      <div className="truncate"><Link className="text-hackbca-blue hover:underline" to={`/projects/${project.id}`}>{project.name}</Link></div>
      <div className="truncate">{project.users.map(u => u.email).join(", ")}</div>
      <div className="truncate">{formatTime(new Date(project.time))}</div>
      <div className="truncate">{getTypeLabel(project.type)}</div>
      <div className="truncate flex flex-row items-center space-x-1">
        <Link className="text-hackbca-blue" to={`/projects/${project.id}/edit`}><FontAwesomeIcon icon={faPen} /></Link>
        <a className="text-red-500" href="#" onClick={event => {
          onDelete(project);
          event.preventDefault();
        }}><FontAwesomeIcon icon={faTrash} /></a>
      </div>
    </>
  );
}

export function Projects() {
  /** @type {Project[]} */
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  useEffect(async () => {
    try {
      const response = await fetch("http://localhost:8000/projects");
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (e) {
      setProjects([]);
      setError(e);
    }
  }, []);

  /** @type {Project | null} */
  const [projectToDelete, setProjectToDelete] = useState(null);

  const loading = !projects && !error;

  return (
    
    <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
    
        <div className="flex items-start mb-6">
          <h1 className="text-5xl font-bold fancy-text w-max max-w-full pb-2">Available Projects</h1>
          <div className="flex-grow" />
          <Link to="/projects/new" className="fancy-button ml-1 block">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
          </Link>
        </div>
        <div className="w-full bg-gray-100 rounded px-3 py-2">
          <div> Click on the project name for more details!</div>
          
          
          <div className="grid grid-cols-5 gap-4 items-start">
            
            <div className="block mt-3 font-medium text-gray-600">Project</div>
            <div className="block mt-3 font-medium text-gray-600">Owner</div>
            <div className="block mt-3 font-medium text-gray-600">Time</div>
            <div className="block mt-3 font-medium text-gray-600">Type</div>
            <div className="block mt-3 font-medium text-gray-600">Edit/Delete</div>

            {projects.map(project => {
              return <ProjectRow project={project} key={project.id} onDelete={project => setProjectToDelete(project)} />;
            })}
            {error && <div className="text-red-500 col-span-full"><strong>Error:</strong> {error.message}</div>}
            {loading && <div className="text-gray-500 col-span-full animate-pulse"><FontAwesomeIcon icon={faCircleNotch} spin /> Loading projects...</div>}
          </div>
        </div>
      </div>
      <StyledModal show={!!projectToDelete} onHide={() => setProjectToDelete(null)}>
        {projectToDelete && <>
          <h3 className="w-full text-center font-bold text-lg">Delete the project "{projectToDelete.name}"?</h3>
          <div className="flex flex-row mt-2 items-stretch">
            <a href="#" className="flex-grow text-center font-medium py-2 px-4 rounded bg-gray-200 transition-colors hover:bg-gray-300 ring-gray-200 focus:ring-4 ring-opacity-50 focus:outline-none w-full flex items-center justify-center" onClick={() => {
              setProjectToDelete(null);
            }}><span>Nope, go back</span></a>
            <div className="w-5"></div>
            <a href="#" className="flex-grow text-center font-medium py-2 px-4 rounded bg-red-500 text-white transition-colors hover:bg-red-700 ring-red-500 focus:ring-4 ring-opacity-50 focus:outline-none w-full flex items-center justify-center" onClick={() => {
              setProjectToDelete(null);
              fetch(`http://localhost:8000/projects/${projectToDelete.id}`, {
                method: "DELETE"
              });
              setProjects(projects.filter(project => project.id !== projectToDelete.id));
            }}><span>Yes! I hate this project! Delete innovation! Caveman era best era. :)</span></a> { /* Blame Edward for this one */ }
          </div>
        </>}
      </StyledModal>
    </div>
  );
}

/*
<div class="container">


<blockquote>
  Click on the event name for more details!
  Click on <i class="material-icons tiny">sort</i> to sort by that column, or items in <i
    class="material-icons tiny">filter_list</i> columns to filter by that item.
</blockquote>
<div class="row">
  <div class="col l3 s12 "> <i class="left material-icons">sort</i>Sorted by: Date / Time</div>
  <div class="col l3 offset-l6 ">
    <!-- Position differently (left) for mobile -->
    <div class="right hide-on-small-only"><i class="left material-icons">filter_list</i>Filter: None</div>
    <div class="left hide-on-med-and-up"><i class="left material-icons">filter_list</i>Filter: None</div>
  </div>

</div>

<!-- https://materializecss.com/table.html -->
<table class="highlight centered responsive-table">
  <thead>
    <tr>
      <!-- USER ONLY-->
      <th><i class="material-icons">star</i>
        <a href="?sort=starred"><i class="material-icons">sort</i></a>
      </th> 

      <th>Event</th>
      <th>Location <a href="?sort=location">
          <i class="material-icons">sort</i></a>
        <i class="material-icons">filter_list</i>
      </th>
      <th>Date / Time
        <a href="?sort=datetime"><i class="material-icons">sort</i></a>
      </th>
      <th>Duration</th>
      <th>Type
        <a href="?sort=type"><i class="material-icons">sort</i></a>
        <i class="material-icons">filter_list</i>
      </th>
      <th>Interest<i class="material-icons">sort</i></th>
    </tr>

    <!-- ADMIN ONLY BUTTONS -->
    <th>Admin Op</th>
  </thead>

  <tbody>
    <tr>

      <!-- USER ONLY - Initialize page with appropriate state of button -->
      <td>
        <a onclick='toggleInterest(this, "{{ event_id }}")'
          class="btn-floating btn-small waves-effect waves-light scale-transition scale-in blue"><i
            class="material-icons">star_border</i></a>
        <!-- If user already "starred" this event, it should be a yellow star -->
        <!-- <a onclick='toggleInterest(this, "{{ event_id }}"))'class="btn-floating btn-small waves-effect waves-light scale-transition scale-in yellow"><iclass="material-icons">star</i></a> -->
      </td>
      <td class="blue-text clickable" onclick="location.href='/events/1.html'">Opening Ceremony</td>
      <td> <a href='?filter=location:Auditorium'>Auditorium </a></td>
      <td><a href='?filter=date:05-01-2022'>May 1 (Sat)</a> 10:30 AM</td>
      <td>30m</td>
      <td> <a href='?filter=type:Main'>Main</a></td>
      <td>100<i class=material-icons>people</i></td>
      <!-- ADMIN ONLY BUTTONS -->
      <td nowrap>

        <a class="btn-floating btn-small waves-effect waves-light green lighten-1" href="/eventform.html"><i
            class="material-icons">edit</i></a>
        <a class="btn-floating waves-effect waves-light red"
          onclick='confirmDelete("Opening Ceremony","{{ event_id}}", ".")'><i
            class="material-icons">delete</i></a>

      </td>
    </tr>

    <tr>

      <!-- USER ONLY - Initialize page with appropriate state of button -->

      <td>
        <a onclick='toggleInterest(this, "{{ event_id }}")'
          class="btn-floating btn-small waves-effect waves-light scale-transition scale-in blue"><i
            class="material-icons">star_border</i></a>
        <!-- If user already "starred" this event, it should be a yellow star -->
        <!-- <a onclick='toggleInterest(this, "{{ event_id }}"))'class="btn-floating btn-small waves-effect waves-light scale-transition scale-in yellow"><iclass="material-icons">star</i></a> -->
      </td>
      <td class="blue-text clickable" onclick="location.href='/events/2.html'">Closing Awards Ceremony</td>
      <td> <a href='?filter=location:Auditorium'>Auditorium </a></td>
      <td><a href='?filter=date:05-02-2021'>May 2 (Sun)</a> 11:00 AM</td>
      <td>30m</td>
      <td> <a href='?filter=type:Main'>Main</a></td>
      <td>99<i class=material-icons>people</i></td>
      <!-- ADMIN ONLY BUTTONS -->
      <td nowrap>

        <a class="btn-floating btn-small waves-effect waves-light green lighten-1" href="./eventform.html"><i
            class="material-icons">edit</i></a>
        <a class="btn-floating waves-effect waves-light red"
          onclick='confirmDelete("Opening Ceremony","{{ event_id}}")'><i class="material-icons">delete</i></a>

      </td>
    </tr>

  </tbody>
</table>
</div>

<a href="/eventform.html" class="btn-floating btn-large orange fixed-action-btn">
<i class="large material-icons">create</i>
</a>

*/