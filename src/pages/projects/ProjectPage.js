import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axios.Defaults";
import Project from "./Project";
import { useRedirect } from "../../hooks/useRedirect";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { BackButton } from "../../components/BackButton";

const ProjectPage = () => {
  useRedirect("loggedOut")
  const history = useHistory();
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axiosReq.get(`/projects/${id}`)
        ]);
        setProject({ results: [project] });
      } catch (err) {
        history.push('/notfound/');
      }
    };

    handleMount();
  }, [id, history]);

  return (
    <>
      {/* passing the projectPage attribute to Project, allows
        to display selected contents. In this way <Project/> component will
        be used inside the project list and project detail. Thanks to
        projectPage attribute we can hide some parts in the list (es: content,
        or other infos not relevant for the list view) */}
      <Project
        {...project.results[0]}
        projectPage
        setProjects={setProject}
        lgImg
      />
      <BackButton/>
      
    </>
  );
};

export default ProjectPage;
