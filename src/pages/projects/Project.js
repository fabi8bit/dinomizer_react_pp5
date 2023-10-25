import React, { useEffect, useState } from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/ProjectAsset.module.css";
import appStyles from "../../App.module.css";
import Avatar from "../../components/Avatar";
import { axiosReq, axiosRes } from "../../api/axios.Defaults";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
// import Contributors from "../participants/ContributorsBanner";
import ContributorsBanner from "../participants/ContributorsBanner";
// import Asset from "../assets/Asset";
import AssetCarousel from "../assets/AssetCarousel";
import DeleteModal from "../../components/DeleteModal";

const Project = (props) => {
  const {
    id,
    owner,
    profile_id,
    project_name,
    profile_image,
    // start_date,
    expected_end_date,
    updated_at,
    content,
    image,
    is_owner,
    status,
    participant_id,
    // participants,
    projectPage,
    setProjects,
  } = props;

  const [assets, setAssets] = useState({ results: [] });
  const currentUser = useCurrentUser();
  console.log(profile_id);

  
  const history = useHistory();

  useEffect(() => {
    const getAssets = async () => {
      try {
        const { data } = await axiosReq.get(`/assets/`);
        setAssets({ results: data });
      } catch (err) {
        console.log(err);
      }
    };
    getAssets();
    console.log(assets);
  }, [props.id]);



  

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

  const handleOpenCreateAsset = () => {
    const data = {thisId: id}
    history.push({pathname: "/assets/create", state: data})
  }

  const [showModalDelete, setShowModalDelete] = useState(false);
  function handleShowModalDelete() {
    setShowModalDelete(!showModalDelete);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/projects/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInProjectPage = (
    <>
      <Row
        xl={2}
        lg={2}
        md={1}
        sm={1}
        xs={1}
      >
        <Card
          bg="dark"
          style={{ minWidth: "50%" }}
        >
          <Card.Body>
            <Col md={12}>
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
                <Card.Header className={styles.ProjectHeader}>
                  <Card.Subtitle>Project name:</Card.Subtitle>
                  <Card.Title className={styles.ProjectAssetTit}>
                    {project_name}
                  </Card.Title>
                </Card.Header>
              </Link>
            </Col>

            {projectPage && (
              <Row>
                <Col>
                  <hr />
                  <Card.Subtitle>Content:</Card.Subtitle>
                  <Card.Text>{content}</Card.Text>
                </Col>
              </Row>
            )}
            <hr />
            <Row className={styles.MarginAuto}>
              <Col className={styles.MarginAuto}>
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
              </Col>

              <Col>
                <Card.Subtitle>Due to:</Card.Subtitle>
                <Card.Text>{expected_end_date}</Card.Text>
              </Col>
              <Col>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>
              </Col>
            </Row>
            {projectPage && (
              <Row>
                <Col className={styles.MarginAuto}>
                  <hr />
                  <ContributorsBanner project_id={id} />
                </Col>
              </Row>
            )}
            <hr />
            <Row
              lg={6}
              sm={12}
              md={12}
              className={styles.MarginAuto}
            >
              {participant_id ? (
                <>
                  <Col>
                    <span onClick={handleCancelPart}>
                      <OverlayTrigger
                        key={participant_id}
                        placement="top"
                        overlay={
                          <Tooltip id={participant_id}>
                            Leave project <strong>{project_name}</strong>
                          </Tooltip>
                        }
                      >
                        <RemoveCircleOutlineIcon />
                      </OverlayTrigger>
                    </span>
                  </Col>
                  <Col>
                    <span
                    onClick={handleOpenCreateAsset}>
                    
                      <OverlayTrigger
                        key={participant_id}
                        placement="top"
                        overlay={
                          <Tooltip id={participant_id}>
                            Add asset to <strong>{project_name}</strong>
                          </Tooltip>
                        }
                      >
                        <AttachFileIcon />
                      </OverlayTrigger>
                    </span>
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                    <span onClick={handleParticipate}>
                      <OverlayTrigger
                        key={participant_id}
                        placement="top"
                        overlay={
                          <Tooltip id={participant_id}>
                            Join project <strong>{project_name}</strong>
                          </Tooltip>
                        }
                      >
                        <PostAddIcon />
                      </OverlayTrigger>
                    </span>
                  </Col>
                </>
              )}

              {is_owner && (
                <>
                <Col>
                  <span onClick={() => history.push(`/projects/${id}/edit`)}>
                    <OverlayTrigger
                      key={participant_id}
                      placement="top"
                      overlay={
                        <Tooltip id={participant_id}>
                          Edit project <strong>{project_name}</strong>
                        </Tooltip>
                      }
                    >
                      <EditIcon />
                    </OverlayTrigger>
                  </span>
                </Col>
                <Col>
                <span onClick={handleShowModalDelete}>
                  <OverlayTrigger
                    key={participant_id}
                    placement="top"
                    overlay={
                      <Tooltip id={participant_id}>
                        Delete project <strong>{project_name}</strong>
                      </Tooltip>
                    }
                  >
                    <DeleteIcon />
                  </OverlayTrigger>
                </span>
              </Col>
              </>
              )}
            </Row>
          </Card.Body>
        </Card>

        <Col>
          <AssetCarousel project_id={id} />
        </Col>
      </Row>
      <hr className={styles.FinalRuler} />
      {showModalDelete && (
        <DeleteModal
          change={handleShowModalDelete}
          deleteitem={handleDelete}
          type="project"
          name={project_name}
        />
      )}
    </>
  );

  return loggedInProjectPage;
};

export default Project;
