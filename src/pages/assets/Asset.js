import React, { useEffect, useState } from "react";
import LoggedOutPage from "../auth/LoggedOutPage";
import {
  Button,
  Card,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { axiosReq, axiosRes } from "../../api/axios.Defaults";
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
    // created_at,
    updated_at,
    project_id,
    project_owner,
    is_owner,
    check_id,
    smImg,
    lgImg,
    assetPage,
    setAssets,
  } = props;

  const [project, setProject] = useState({});
  const currentUser = useCurrentUser();

  const history = useHistory();

  useEffect(() => {
    const getProject = async () => {
      try {
        console.log(project_id);
        const { data } = await axiosReq.get(`/projects/${project_id}`);
        setProject(data);
        console.log(project);
      } catch (err) {
        console.log(err);
      }
    };
    getProject();
  },[props.project_id])
  

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
        style={{ width: "50%", maxHeight: "50vh" }}
      >
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
        <Card.Body>
          <Card.Title className={styles.ProjectAssetTit}>
            {asset_name}
          </Card.Title>
          {assetPage && (
            <>
              <br />
              <Card.Subtitle>Category:</Card.Subtitle>
              <Card.Text>
                <strong>{category}</strong>
              </Card.Text>
              <br />
              <Card.Subtitle>Last update:</Card.Subtitle>
              <Card.Text>
                <strong>{updated_at}</strong>
              </Card.Text>
              <br />
              <Card.Subtitle>Content:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <br />
              <Card.Subtitle>Related to project:</Card.Subtitle>
              <Card.Text>
                <strong>{project.project_name}</strong>
              </Card.Text>
              <br />
            </>
          )}

          <Button variant="primary">Options</Button>
        </Card.Body>
      </Card>
    </Container>
  );

  return <>{currentUser ? loggedInAssetPage : <LoggedOutPage />}</>;
};

export default Asset;
