import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faStar, faPen, faTrash, faUsers, faBarsSort, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export function Projects() {
  return (
    
    <div className="bg-hackbca-dark-blue min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg p-8 w-192 max-w-full">
    
        <div className="flex items-start mb-6">
          <h1 className="text-5xl font-bold fancy-text w-max max-w-full pb-2">Available Projects</h1>
          <div className="flex-grow" />
          <Link to="/projectform" className="fancy-button ml-1 block">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
          </Link>
        </div>
        <div className="w-full bg-gray-100 rounded px-3 py-2">
          <div> Click on the project name for more details!</div>
          
          
          <div class="grid grid-cols-6 gap-4 items-start">
            
            <div class="block mt-3 font-medium text-gray-600">Project</div>
            <div class="block mt-3 font-medium text-gray-600">Owner</div>
            <div class="block mt-3 font-medium text-gray-600">Time</div>
            <div class="block mt-3 font-medium text-gray-600">Type</div>
            <div class="block mt-3 font-medium text-gray-600">People Interested</div>
            <div class="block mt-3 font-medium text-gray-600" >Edit/Delete</div>

            <div><Link className="text-hackbca-blue hover:underline" to="/projects/1">Remake Something!</Link></div>
            <div>Anonymous</div>
            <div>10:30 am</div>
            <div>Coding</div>
            <div>5 <FontAwesomeIcon icon={faUsers} /></div>
            <div className="flex flex-row items-center space-x-1"><Link className="text-hackbca-blue" to="/projectform?update=true"><FontAwesomeIcon icon={faPen} /></Link> <FontAwesomeIcon icon={faTrash} /></div>

            <div><Link className="text-hackbca-blue hover:underline" to="/projects/2">Project 2</Link></div>
            <div>Anonymous 2</div>
            <div>10:45 am</div>
            <div>Games</div>
            <div>3 <FontAwesomeIcon icon={faUsers} /></div>
            <div className="flex flex-row items-center space-x-1"><Link className="text-hackbca-blue" to="/projectform?update=true"><FontAwesomeIcon icon={faPen} /></Link> <FontAwesomeIcon icon={faTrash} /></div>


          </div>
        </div>
      </div>
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