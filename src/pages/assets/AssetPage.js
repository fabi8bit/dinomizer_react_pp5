import React, { useEffect, useState } from "react";

// import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axios.Defaults";
// import { useCurrentUser } from "../../context/CurrentUserContext";
// import { Col, Row } from "react-bootstrap";
// import styles from "../../styles/ProjectAsset.module.css";
import Asset from "./Asset";
import { useRedirect } from "../../hooks/useRedirect";
import { BackButton } from "../../components/BackButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AssetPage = () => {
  // const currentUser = useCurrentUser();
  useRedirect("loggedOut");
  const { id } = useParams();
  const history = useHistory();
  const [asset, setAsset] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: asset }] = await Promise.all([
          axiosReq.get(`/assets/${id}`),
        ]);
        setAsset({ results: [asset] });
      } catch (err) {
        history.push('/notfound/');
        console.log(err);
      }
    };

    handleMount();
  }, [id, history]);

  return (
    <>
      <Asset
        {...asset.results[0]}
        lgImg
        assetPage
        setAssets={setAsset}
      />
      <BackButton />
    </>
  );
};

export default AssetPage;
