import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';

import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';
import { NewProjectForm, UpdateProjectForm } from './pages/ProjectForm';
import { Navbar } from "./Navbar";
import { NotFound } from "./pages/404";
import { Footer } from "./Footer";
import { getAPIURL } from "./utils";

/** @type {import("react").Context<User>} */
export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const response = await fetch(`${getAPIURL()}/me`, {credentials: "include"});
    if (response.status === 200) {
      const data = await response.json();
      setUser(data);
    }
  }, []);

  return (
    <AuthContext.Provider value={user}>
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
    </AuthContext.Provider>
  );
}

export default App;
