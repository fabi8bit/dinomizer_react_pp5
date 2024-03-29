import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axios.Defaults";
import Placeholder from "../../components/Placeholder";
import Project from "./Project";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utility/utility";
import { useRedirect } from "../../hooks/useRedirect";

function ProjectsPage({ message, myProjects }) {
  useRedirect("loggedOut");
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
    <>
      <Container>
        <Row>
          <Col>
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Label className="d-none">Searchbar</Form.Label>
              <FormControl
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search projects"
                name="Searchbar"
              />
            </Form>
          </Col>
        </Row>
      </Container>
      {hasLoaded ? (
        <>
          {projects.results.length ? (
            <InfiniteScroll
              dataLength={projects.results.length}
              loader={<Placeholder spinner />}
              hasMore={!!projects.next}
              next={() => fetchMoreData(projects, setProjects)}
            >
              {myProjects
                ? projects.results
                    .filter((project) => project.participant_id)
                    .map((project) => (
                      <Project
                        key={project.id}
                        {...project}
                        setProjects={setProjects}
                        fromProjects
                      />
                    ))
                : projects.results.map((project) => (
                    <Project
                      key={project.id}
                      {...project}
                      setProjects={setProjects}
                      fromTimeline
                    />
                  ))}
            </InfiniteScroll>
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
    </>
  );
}

export default ProjectsPage;
