import React from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/ProjectAsset.module.css";
import appStyles from "../../App.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axios.Defaults";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

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
    smImg,
    lgImg,
  } = props;

  const currentUser = useCurrentUser();

  const history = useHistory();

  const handleParticipate = async () => {
    try {
      const { data } = await axiosRes.post("/participants/", {
        project_id: id,
      });
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
            ? {
                ...project,
                participants: project.participants - 1,
                participant_id: null,
              }
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
        <hr/>
          <Row>
            {smImg && (
              <Col>
                <Image
                  className={styles.FillerImage}
                  src={image}
                />
              </Col>
            )}
            <Link
              className={appStyles.Links}
              to={`/projects/${id}`}
            >
              <Col>
                <p className={styles.ProjectAssetTit}>
                  Project: <br />
                  <strong>{project_name}</strong>
                </p>
              </Col>
            </Link>
            {participant_id ? (
              <Col
                lg={3}
                sm={12}
              >
                <p className={`${styles.ProjectAssetTit}`}>
                  <Button
                    onClick={handleCancelPart}
                    aria-label="edit-profile"
                    variant="secondary"
                    block
                  >
                    <RemoveCircleOutlineIcon /> Unprovide
                  </Button>
                </p>
              </Col>
            ) : (
              <Col
                lg={3}
                sm={12}
              >
                <p className={`${styles.ProjectAssetTit}`}>
                  <Button
                    onClick={handleParticipate}
                    aria-label="edit-profile"
                    variant="success"
                    block
                  >
                    <AddCircleOutlineIcon /> Provide
                  </Button>
                </p>
              </Col>
            )}
          </Row>
          {is_owner && (
              <Row>
                <Col>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Edit"
                    size="sm"
                  >
                    <Dropdown.Item
                      href="#"
                      onClick={() => history.push(`/projects/${id}/edit`)}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Delete</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            )}
          <hr />

          <Row>
            <Col>
              <p className={styles.Paragraphs}>Owner:</p>
              <Avatar
                src={profile_image}
                height={30}
              />
              <strong>{owner}</strong>
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
      {lgImg && (
        <Row>
          <Image
            className={styles.FillerImage}
            src={image}
          />
        </Row>
      )}

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
              <p className={styles.Paragraphs}>{participants}</p>
            </Col>
          </Row>
        </>
      )}

      <hr className={styles.FinalRuler} />
    </Container>
  );

  return <>{currentUser ? loggedInProjectPage : <LoggedOutPage />}</>;
};

export default Project;
