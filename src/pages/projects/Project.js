import React from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/ProjectAsset.module.css";
import appStyles from "../../App.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axios.Defaults";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Contributors from "../participants/ContributorsBanner";
import ContributorsBanner from "../participants/ContributorsBanner";

const Project = (props) => {
  const {
    id,
    owner,
    profile_id,
    project_name,
    profile_image,
    // start_date,
    // expected_end_date,
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
      <Card
        bg="dark"
        style={{ width: "100%" }}
      >
        
        <Card.Body>
        <Link
              className={appStyles.Links}
              to={`/projects/${id}`}
            >
              <div className={styles.ImageBox}>
          <Card.Img
            className={styles.FillerImage}
            src={image}
            alt={project_name}
          />
        </div>
          <Card.Header>
            <Card.Subtitle>Project name:</Card.Subtitle>
            <Card.Title className={styles.ProjectAssetTit}>
              {project_name}
            </Card.Title>
          </Card.Header></Link>
          {projectPage && (
            <>
              <br />
              <Card.Subtitle>Content:</Card.Subtitle>
              <Card.Text>{content}</Card.Text>
            </>
          )}
          <ListGroup horizontal>
            <ListGroup.Item className={styles.ListGroupCust}>
              <Card.Link
                className={appStyles.Links}
                href={`/profiles/${profile_id}`}
              >
                <Avatar
                  src={profile_image}
                  height={30}
                />
                <strong>{owner}</strong>
              </Card.Link>
            </ListGroup.Item>
            <ListGroup.Item className={styles.ListGroupCust}>
              updated: {updated_at}
            </ListGroup.Item>
            <ListGroup.Item className={styles.ListGroupCust}>
              status: {status}
            </ListGroup.Item>
          </ListGroup>
          {projectPage && <ContributorsBanner project_id={id} />}
          <br />
          <ListGroup horizontal>
            <ListGroup.Item className={styles.ListGroupCust}>
              {participant_id ? (
                <>
                  <Button
                    onClick={handleCancelPart}
                    aria-label="leave-project"
                    variant="secondary"
                    block
                  >
                    <RemoveCircleOutlineIcon /> Leave
                  </Button>
                  <Button
                    onClick={() =>
                      history.push({
                        pathname: "/assets/create",
                        state: { id },
                      })
                    }
                    aria-label="create-asset"
                    variant="success"
                    block
                  >
                    <AddCircleOutlineIcon /> <br />
                    Add Asset
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleParticipate}
                  aria-label="edit-profile"
                  variant="success"
                  block
                >
                  <AddCircleOutlineIcon /> Join
                </Button>
              )}
            </ListGroup.Item>
            {is_owner && (
              <>
                <ListGroup.Item className={styles.ListGroupCust}>
                  <Button
                    onClick={() => history.push(`/projects/${id}/edit`)}
                    aria-label="edit-project"
                    variant="primary"
                    block
                  >
                    <EditIcon /> Edit Project
                  </Button>
                  <Button
                    onClick={() => {}}
                    aria-label="cancel-project"
                    variant="danger"
                    block
                  >
                    <DeleteIcon /> Delete Project
                  </Button>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      <hr className={styles.FinalRuler} />
    </Container>
  );

  return <>{currentUser ? loggedInProjectPage : <LoggedOutPage />}</>;
};

export default Project;
