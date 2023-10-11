import React, { useEffect, useState } from "react";

// import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axios.Defaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Col, Row } from "react-bootstrap";
import Project from "./Project";
import styles from "../../styles/ProjectAsset.module.css";

const ProjectPage = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
        ]);
        setProject({ results: [project] });
        console.log(project);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row>
      <Col
      className={styles.Section1}
        lg={6}
        sm={12}
      >
        {/* passing the projectPage attribute to Project, allows
        to display selected contents. In this way <Project/> component will
        be used inside the project list and project detail. Thanks to
        projectPage attribute we can hide some parts in the list (es: content,
        or other infos not relevant for the list view) */}
        <Project {...project.results[0]} projectPage setProjects={setProject} lgImg/>
      </Col>
      <Col>Assets Column</Col>
    </Row>
  );
};

export default ProjectPage;
