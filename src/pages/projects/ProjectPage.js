import React, { useEffect, useState } from "react";

// import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axios.Defaults";
// import { useCurrentUser } from "../../context/CurrentUserContext";
// import { Col, Row } from "react-bootstrap";
import Project from "./Project";
import { useRedirect } from "../../hooks/useRedirect";
// import styles from "../../styles/ProjectAsset.module.css";
// import Asset from "../assets/Asset";

const ProjectPage = () => {
  useRedirect("loggedOut")
  // const currentUser = useCurrentUser();
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  // const [asset, setAsset] = useState({ results: [] });
  // const [participants, setParticipants] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
          // axiosReq.get(`/participants/?project_id=${id}`),
        ]);
        setProject({ results: [project] });
        // setParticipants(participants);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

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
    </>
  );
};

export default ProjectPage;
