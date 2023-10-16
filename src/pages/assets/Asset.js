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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import { axiosRes } from "../../api/axios.Defaults";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const Asset = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    asset_name,
    category,
    description,
    image,
    assetfile,
    created_at,
    updated_at,
    project_id,
    project_owner,
    is_owner,
    check_id,
    smImg,
    lgImg,
    assetPage,
  } = props;

  const currentUser = useCurrentUser();

  const history = useHistory();

  //   const handleParticipate = async () => {
  //     try {
  //       const { data } = await axiosRes.post("/participants/", {
  //         project_id: id,
  //       });
  //       setProjects((prevProjects) => ({
  //         ...prevProjects,
  //         results: prevProjects.results.map((project) => {
  //           return project.id === id
  //             ? {
  //                 ...project,
  //                 participants: project.participants + 1,
  //                 participant_id: data.id,
  //               }
  //             : project;
  //         }),
  //       }));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const handleCancelPart = async () => {
  //     try {
  //       await axiosRes.delete(`/participants/${participant_id}/`);
  //       setProjects((prevProjects) => ({
  //         ...prevProjects,
  //         results: prevProjects.results.map((project) => {
  //           return project.id === id
  //             ? {
  //                 ...project,
  //                 participants: project.participants - 1,
  //                 participant_id: null,
  //               }
  //             : project;
  //         }),
  //       }));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const loggedInAssetPage = (
    <Container>
      <Row>
        <Col>
          <hr />
          <Row className={styles.ProjectHeader}>
            {smImg && (
              <Col>
                <Image
                  className={styles.FillerImage}
                  src={image}
                  alt={asset_name}
                />
              </Col>
            )}
            <Link
              className={appStyles.Links}
              to={`/assets/${id}`}
            >
              <Col>
                <p className={styles.ProjectAssetTit}>
                  Asset name: <br />
                  <strong>{asset_name}</strong>
                </p>
              </Col>
            </Link>
          </Row>
          <Row>
            <Col>
              <p className={styles.Paragraphs}>Category: {category}</p>
            </Col>
          </Row>
          {is_owner && (
            <Row>
              <Col>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Edit"
                  size="sm"
                  lg={4}
                >
                  <Dropdown.Item
                    href="#"
                    onClick={() => history.push(`/assets/${id}/edit`)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Delete</Dropdown.Item>
                </DropdownButton>
              </Col>
              {project_owner && (
                <>
                {check_id ? (
                <Col lg={4}>
                  <Button
                    size="sm"
                    variant="secondary"
                  >
                    <RadioButtonUncheckedIcon/>
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button
                    size="sm"
                    variant="success"
                  >
                    <CheckCircleIcon/>
                  </Button>
                </Col>
              )}
                </>
              )}
            </Row>
          )}
          {project_owner && (
            <Row>
              
            </Row>
          )}

          <hr />

          <Row>
            <Col>
              <p className={styles.Paragraphs}>Owner:</p>
              <Link
                className={appStyles.Links}
                to={`/profiles/${profile_id}`}
              >
                <Avatar
                  src={profile_image}
                  height={30}
                />
                <strong>{owner}</strong>
              </Link>
            </Col>
            <Col>
              <Link
                className={appStyles.Links}
                to={`/projects/${project_id}`}
              >
                <p className={styles.Paragraphs}>Project:</p>
                <p className={styles.Paragraphs}>{project_id}</p>
              </Link>
            </Col>
            <Col>
              <p className={styles.Paragraphs}>Last update:</p>
              <p className={styles.Paragraphs}>{updated_at}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      {lgImg && (
        <Row>
          <Image
            className={styles.FillerImage}
            src={image}
            alt={asset_name}
          />
        </Row>
      )}

      {assetPage && (
        <>
          <Row>
            <Col>
              <p className={styles.Paragraphs}>Description:</p>
              <p className={styles.Paragraphs}>{description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <a
                className={appStyles.Links}
                href={`https://res.cloudinary.com/dhsjcm3v3/${assetfile}`}
                target="_blank"
              >
                <p className={styles.Paragraphs}>
                  Click here for the original file
                </p>
              </a>
            </Col>
          </Row>
        </>
      )}

      <hr className={styles.FinalRuler} />
    </Container>
  );

  return <>{currentUser ? loggedInAssetPage : <LoggedOutPage />}</>;
};

export default Asset;
