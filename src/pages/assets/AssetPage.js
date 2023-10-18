import React, { useEffect, useState } from "react";

// import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axios.Defaults";
// import { useCurrentUser } from "../../context/CurrentUserContext";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import Asset from "./Asset";

const AssetPage = () => {
  // const currentUser = useCurrentUser();
  const { id } = useParams();
  const [asset, setAsset] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: asset }] = await Promise.all([
          axiosReq.get(`/assets/${id}`),
        ]);
        setAsset({ results: [asset] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row>
      <Col
      className={styles.Section1}
        lg={6}
        sm={12}
      >
        <Asset {...asset.results[0]} lgImg assetPage setAssets={setAsset}/>
      </Col>
    </Row>
  );
};

export default AssetPage;
