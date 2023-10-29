import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import appStyles from "../../App.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { axiosReq, axiosRes } from "../../api/axios.Defaults";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";
import DeleteModal from "../../components/DeleteModal";

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
  const [fileExists, setFileExists] = useState();

  const history = useHistory();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/${project_id}`);
        setProject(data);
      } catch (err) {
        // console.log(err);
      }
    };

    const defineDownload = () => {
      if (assetfile == null) {
        setFileExists(false);
      } else {
        setFileExists(true);
      }
    };

    getProject();
    defineDownload();
  }, [project_id, fileExists, assetfile]);

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
      // console.log(err);
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

  const [showModalDelete, setShowModalDelete] = useState(false);
  function handleShowModalDelete() {
    setShowModalDelete(!showModalDelete);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/assets/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInAssetPage = (
    <Container>
      <Card bg="dark">
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
                    <FileOpenIcon className={`${styles.ProjectAssetTit}`} /> |{" "}
                    {asset_name}
                  </Link>
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
                  <DropdownButton
                    title="Options"
                    variant="primary"
                  >
                    {is_owner && (
                      <>
                        <Dropdown.Item
                          onClick={() => history.push(`/assets/${id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                      </>
                    )}
                    {fileExists && (
                      <Dropdown.Item
                        className={appStyles.Links2}
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
                          <Dropdown.Item onClick={handleUncheck}>
                            Uncheck
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={handleCheck}>
                            Check
                          </Dropdown.Item>
                        )}
                      </>
                    )}
                    <Dropdown.Divider />
                    {is_owner && (
                      <Dropdown.Item onClick={handleShowModalDelete}>
                        Delete
                      </Dropdown.Item>
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

                  <Card.Title className={`${styles.ProjectAssetTit}`}>
                    <Link to={`/assets/${id}`}>
                      {asset_name} |{" "}
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
                    <Link to={`/projects/${project_id}`}>
                      <strong>{project.project_name}</strong> |
                      <FileOpenIcon
                        className={`${styles.ProjectAssetTit} ${appStyles.Links}`}
                      />
                    </Link>
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
                  <DropdownButton
                    title="Options"
                    variant="primary"
                  >
                    {is_owner && (
                      <>
                        <Dropdown.Item
                          onClick={() => history.push(`/assets/${id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                      </>
                    )}
                    {fileExists && (
                      <Dropdown.Item
                        className={appStyles.Links2}
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
                          <Dropdown.Item onClick={handleUncheck}>
                            Uncheck
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={handleCheck}>
                            Check
                          </Dropdown.Item>
                        )}
                      </>
                    )}
                    <Dropdown.Divider />
                    {is_owner && (
                      <Dropdown.Item onClick={handleShowModalDelete}>
                        Delete
                      </Dropdown.Item>
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
                    <Link to={`/projects/${project_id}`}>
                      <strong>{project.project_name}</strong> | 
                      <FileOpenIcon
                        className={`${styles.ProjectAssetTit} ${appStyles.Links}`}
                      />
                    </Link>
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
      <hr className={styles.FinalRuler} />
      {showModalDelete && (
        <DeleteModal
          change={handleShowModalDelete}
          deleteitem={handleDelete}
          type={category}
          name={asset_name}
        />
      )}
    </Container>
  );

  return loggedInAssetPage;
};

export default Asset;
