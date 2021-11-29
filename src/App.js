import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './index.css';

import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';
import { NewProjectForm, UpdateProjectForm } from './pages/ProjectForm';
import { Navbar } from "./Navbar";
import { NotFound } from "./pages/404";
import { Footer } from "./Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/edit" element={<UpdateProjectForm />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/projects/new" element={<NewProjectForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
