import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axios.Defaults";
import Placeholder from "../../components/Placeholder";
import Project from "./Project";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utility/utility";

function ProjectsPage({ message, myProjects }) {
  const [projects, setProjects] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/?search=${query}`);
        setProjects(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchProjects();
  }, [pathname, query]);

  return (
    <Row>
      <Col
        className={styles.Section1}
        lg={6}
        sm={12}
      >
        <Container>
          <Row>
            <Col>
              <Form
                className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()}
              >
                <FormControl
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search projects"
                />
              </Form>
            </Col>
          </Row>
        </Container>
        {hasLoaded ? (
          <>
            {projects.results.length ? (

              <InfiniteScroll
                children={
                  myProjects ? (
                    projects.results
                      .filter((project) => project.participant_id)
                      .map((project) => (
                        <Project
                          key={project.id}
                          {...project}
                          setProjects={setProjects}
                          smImg
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
                }
                dataLength={projects.results.length}
                loader={<Placeholder spinner/>}
                hasMore={!!projects.next}
                next={() => fetchMoreData(projects,setProjects)}
              />
              
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
      </Col>

      {myProjects && <Col>Assets</Col>}
    </Row>
  );
}

export default ProjectsPage;
