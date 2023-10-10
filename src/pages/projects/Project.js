import React from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/ProjectAsset.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axios.Defaults";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Project = (props) => {
  const {
    id,
    owner,
    profile_id,
    project_name,
    profile_image,
    start_date,
    expected_end_date,
    updated_at,
    content,
    image,
    is_owner,
    status,
    participant_id,
    participants,
    projectPage,
    setProjects,
  } = props;

  const currentUser = useCurrentUser();

  const handleParticipate = async () => {
    try {
      const { data } = await axiosRes.post("/participants/", { project_id: id });
      setProjects((prevProjects) => ({
        ...prevProjects,
        results: prevProjects.results.map((project) => {
          return project.id === id
            ? {
                ...project,
                participants: project.participants + 1,
                participant_id: data.id,
              }
            : project;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelPart = async () => {
    try {
      await axiosRes.delete(`/participants/${participant_id}/`);
      setProjects((prevProjects) => ({
        ...prevProjects,
        results: prevProjects.results.map((project) => {
          return project.id === id
            ? { ...project, participants: project.participants - 1, participant_id: null }
            : project;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInProjectPage = (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <p className={styles.ProjectAssetTit}>
                Project: <strong>{project_name}</strong>
              </p>
            </Col>
            {participant_id ? (
              <Col>
                <p className={`${styles.ProjectAssetTit}`}>
                <Button
                onClick={handleCancelPart}
                aria-label="edit-profile"
                variant="primary"
                block
              >
                <RemoveCircleOutlineIcon/> Cancel contrib.
              </Button>
                  
                </p>
              </Col>
            ) : (
              <Col>
                <p className={`${styles.ProjectAssetTit}`}>
                <Button
                onClick={handleParticipate}
                aria-label="edit-profile"
                variant="primary"
                block
              >
                <AddCircleOutlineIcon/> Contribute
              </Button>
                  
                </p>
              </Col>
            )}
          </Row>
          <hr />

          <Row>
            <Col>
              <p className={styles.Paragraphs}>Owner:</p>
              <Avatar
                src={currentUser?.profile_image}
                height={30}
              />
              <strong>{currentUser?.username}</strong>
            </Col>
            <Col>
              <p className={styles.Paragraphs}>Last update:</p>
              <p className={styles.Paragraphs}>{updated_at}</p>
            </Col>
            <Col>
              <p className={styles.Paragraphs}>Status:</p>
              <p className={styles.Paragraphs}>{status}</p>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Image
          className={styles.FillerImage}
          src={image}
        />
      </Row>
      {projectPage && (
        <>
          <Row>
            <Col>
              <p className={styles.Paragraphs}>Content:</p>
              <p className={styles.Paragraphs}>{content}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles.Paragraphs}>
                Contributors ({participants}):
              </p>
              <p className={styles.Paragraphs}>{content}</p>
            </Col>
          </Row>
        </>
      )}
      {is_owner && (
        <>
          <Row>
            <Col>
              <Button
                onClick={() => {}}
                aria-label="edit-profile"
                variant="primary"
                block
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                block
              >
                Delete
              </Button>
            </Col>
          </Row>
        </>
      )}
      <hr />
    </Container>
  );

  return <>{currentUser ? loggedInProjectPage : <LoggedOutPage />}</>;
};

export default Project;
