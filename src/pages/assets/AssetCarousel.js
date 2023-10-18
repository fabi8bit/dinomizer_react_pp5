import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axios.Defaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Card, Carousel, ListGroup } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProjectAsset.module.css";
import Asset from "./Asset";

function AssetCarousel({ project_id }) {
  const [assets, setAssets] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/assets`);
        setAssets(data);
        // console.log(participants.results);
      } catch (err) {
        console.log(err);
      }
    };

    
    console.log(project_id);
    handleMount();
  }, []);

  return (
    <>
      {assets.results.length ? (
        <>
          <Card.Subtitle className={styles.MarginTop}>Assets for this project</Card.Subtitle>
          <br />
          <Carousel interval={null}>
            {assets.results
              .filter((asset) => asset.project_id === project_id)
              .map((asset) => (
                <Carousel.Item>
                  <Card.Link
                    className={appStyles.Links}
                    href={`/assets/${asset.asset_id}`}
                  >
                    <Asset
                      key={asset.id}
                      {...asset}
                      setAssets={setAssets}
                    />
                  </Card.Link>
                </Carousel.Item>
              ))}
          </Carousel>
        </>
      ) : (
        "Add assets for this project"
      )}
    </>
  );
}

export default AssetCarousel;
