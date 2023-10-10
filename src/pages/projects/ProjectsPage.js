import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axios.Defaults";
import Placeholder from "../../components/Placeholder";
import Project from "./Project";

function ProjectsPage({ message, myProjects }) {
  const [projects, setProjects] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/`);
        setProjects(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchProjects();
  }, [pathname]);

  return (
    <Row>
      {/* In progress section */}
      <Col
        className={styles.Section1}
        lg={6}
        sm={12}
      >
        {hasLoaded ? (
          <>
            {projects.results.length ? (
              myProjects ? (
                projects.results
                  .filter((project) => project.participant_id)
                  .map((project) => (
                    <Project
                      key={project.id}
                      {...project}
                      setProjects={setProjects}
                    />
                  ))
              ) : (
                projects.results.map((project) => (
                  <Project
                    key={project.id}
                    {...project}
                    setProjects={setProjects}
                  />
                ))
              )
            ) : (
              <Container>
                <Placeholder
                  src={""}
                  message={message}
                />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Placeholder spinner />
          </Container>
        )}
        {/* {hasLoaded ? (
            {myProjects} ? (
              <>
              <h1>my proj</h1>
              </>
            ) : (
              <>
            {projects.results.length ? (
                projects.results.map((project) => (
                  <Project key={project.id} {...project} setProjects={setProjects} />
                  ))
            ):(
                <Container>
                <Placeholder src={""} message={message} />
              </Container>
            )}
            </>
            )
            
        ) : (
            <Container>
            <Placeholder spinner />
          </Container>
        )} */}
      </Col>

      {/* Planned section */}
      <Col
        className={styles.Section2}
        lg={3}
        sm={12}
      >
        Planned
      </Col>

      {/* Overdue section */}
      <Col
        className={styles.Section3}
        lg={3}
        sm={12}
      >
        Overdue
      </Col>
    </Row>
  );
}

export default ProjectsPage;
