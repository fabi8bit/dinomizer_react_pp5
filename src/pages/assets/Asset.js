import React, { useEffect, useState } from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/ProjectAsset.module.css";
import appStyles from "../../App.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileOpenIcon from "@mui/icons-material/FileOpen";
// import Avatar from "../../components/Avatar";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { axiosReq, axiosRes } from "../../api/axios.Defaults";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";

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
    // created_at,
    updated_at,
    project_id,
    project_owner,
    is_owner,
    check_id,
    assetPage,
    setAssets,
    myContribute,
    carousel,
  } = props;

  const [project, setProject] = useState({});
  const currentUser = useCurrentUser();

  const history = useHistory();
  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/${project_id}`);
        setProject(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProject();
  }, [props.project_id]);

  // useEffect(() => {
  //   const handleMount = async () => {
  //     try {
  //       console.log(project_id)
  //       const { data } = await axiosReq.get(`/projects/${project_id}`);
  //       setProject(data)
  //       console.log(project.results.project_name)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   };

  //   handleMount();
  // }, [project_id])

  const handleCheck = async () => {
    try {
      const { data } = await axiosRes.post("/checks/", {
        asset_id: id,
      });
      setAssets((prevAsset) => ({
        ...prevAsset,
        results: prevAsset.results.map((asset) => {
          return asset.id === id
            ? {
                ...asset,
                check_id: data.id,
              }
            : asset;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUncheck = async () => {
    try {
      await axiosRes.delete(`/checks/${check_id}/`);
      setAssets((prevAsset) => ({
        ...prevAsset,
        results: prevAsset.results.map((asset) => {
          return asset.id === id
            ? {
                ...asset,
                check_id: null,
              }
            : asset;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInAssetPage = (
    <Container>
      <Card
        bg="dark"
        // style={{ width: "50%"}}
      >
        <Row>
          {carousel && (
            <>
              <Col lg={4}>
                <Link
                  className={appStyles.Links}
                  to={`/assets/${id}`}
                >
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={asset_name}
                  />
                </Link>
              </Col>
              <Col>
                {check_id && (
                  <>
                    <Badge variant="success">Checked</Badge>
                  </>
                )}
                <Card.Title className={styles.ProjectAssetTit}>
                  <Link to={`/assets/${id}`}>
                    <FileOpenIcon
                      className={`${styles.ProjectAssetTit} ${appStyles.Links}`}
                    />
                  </Link>{" "}
                  | {asset_name}
                </Card.Title>
                <hr />
                <Card.Subtitle>Last update:</Card.Subtitle>
                <Card.Text>
                  <strong>{updated_at}</strong>
                </Card.Text>
              </Col>
            </>
          )}

          {myContribute && (
            <>
              <Col
                lg={4}
                sm={12}
              >
                <Card.Img
                  variant="top"
                  src={image}
                  alt={asset_name}
                />

                <Card.ImgOverlay>
                  <DropdownButton title="" variant="primary">
                    {is_owner ? (
                      <>
                        <Dropdown.Item
                          onClick={() => history.push(`/assets/${id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={appStyles.Links2}
                          href={`https://res.cloudinary.com/dhsjcm3v3/${assetfile}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileDownloadIcon />
                          Download
                        </Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item
                        className={appStyles.Links2}
                        href={`https://res.cloudinary.com/dhsjcm3v3/${assetfile}`}
                      >
                        <FileDownloadIcon />
                        Download
                      </Dropdown.Item>
                    )}
                    {project_owner && (
                      <>
                        {check_id ? (
                          <Dropdown.Item
                            onClick={handleUncheck}
                          >
                            Uncheck
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={handleCheck}
                          >
                            Check
                          </Dropdown.Item>
                        )}
                      </>
                    )}
                    <Dropdown.Divider />
                    {is_owner && <Dropdown.Item>Delete</Dropdown.Item>}
                  </DropdownButton>
                </Card.ImgOverlay>
              </Col>

              <Col>
                <Card.Body>
                  {check_id && (
                    <>
                      <Badge variant="success">Checked</Badge>
                    </>
                  )}

                  <Card.Title className={`${styles.ProjectAssetTit}`}>
                    {asset_name} |{" "}
                    <Link to={`/assets/${id}`}>
                      <FileOpenIcon
                        className={`${styles.ProjectAssetTit} ${appStyles.Links}`}
                      />
                    </Link>
                  </Card.Title>
                  <hr />
                  <Card.Subtitle>Category:</Card.Subtitle>
                  <Card.Text>
                    <strong>{category}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle>Last update:</Card.Subtitle>
                  <Card.Text>
                    <strong>{updated_at}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle>Content:</Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                  <hr />
                  <Card.Subtitle>Related to project:</Card.Subtitle>
                  <Card.Text>
                    <strong>{project.project_name}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle className={styles.MarginBotSmall}>
                    Asset created by:
                  </Card.Subtitle>

                  <Avatar
                    src={profile_image}
                    height={30}
                  />
                  <Card.Link
                    className={appStyles.Links}
                    href={`/profiles/${profile_id}`}
                  >
                    <strong>{owner}</strong>
                  </Card.Link>

                  <br />
                </Card.Body>
              </Col>
            </>
          )}

          {assetPage && (
            <>
              <Col lg={5}>
                <Card.Img
                  variant="top"
                  src={image}
                  alt={asset_name}
                />
                <Card.ImgOverlay>
                  <DropdownButton title="" variant="primary">
                    {is_owner ? (
                      <>
                        <Dropdown.Item
                          onClick={() => history.push(`/assets/${id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          href={`https://res.cloudinary.com/dhsjcm3v3/${assetfile}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileDownloadIcon />
                          Download
                        </Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item
                          href={`https://res.cloudinary.com/dhsjcm3v3/${assetfile}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileDownloadIcon />
                          Download
                        </Dropdown.Item>
                    )}
                    {project_owner && (
                      <>
                        {check_id ? (
                          <Dropdown.Item
                            onClick={handleUncheck}
                          >
                            Uncheck
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={handleCheck}
                          >
                            Check
                          </Dropdown.Item>
                        )}
                      </>
                    )}
                    <Dropdown.Divider />
                    {is_owner && (
                      <Dropdown.Item>Delete</Dropdown.Item>
                    )}
                  </DropdownButton>
                </Card.ImgOverlay>
              </Col>

              <Col>
                <Card.Body>
                  {check_id && (
                    <>
                      <Badge variant="success">Checked</Badge>
                    </>
                  )}

                  <Card.Title className={styles.ProjectAssetTit}>
                    {asset_name}
                  </Card.Title>
                  <hr />
                  <Card.Subtitle>Category:</Card.Subtitle>
                  <Card.Text>
                    <strong>{category}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle>Last update:</Card.Subtitle>
                  <Card.Text>
                    <strong>{updated_at}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle>Content:</Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                  <hr />
                  <Card.Subtitle>Related to project:</Card.Subtitle>
                  <Card.Text>
                    <strong>{project.project_name}</strong>
                  </Card.Text>
                  <hr />
                  <Card.Subtitle className={styles.MarginBotSmall}>
                    Asset created by:
                  </Card.Subtitle>

                  <Avatar
                    src={profile_image}
                    height={30}
                  />
                  <Card.Link
                    className={appStyles.Links}
                    href={`/profiles/${profile_id}`}
                  >
                    <strong>{owner}</strong>
                  </Card.Link>

                  <br />
                </Card.Body>
              </Col>
            </>
          )}
        </Row>
      </Card>

      {assetPage && (
        <Button
          className={styles.MarginTop}
          variant="warning"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
      )}
      <hr className={styles.FinalRuler} />
    </Container>
  );

  return <>{currentUser ? loggedInAssetPage : <LoggedOutPage />}</>;
};

export default Asset;
