import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axios.Defaults";
// import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
// import Avatar from "../../components/Avatar";
import Contributor from "./Contributor";
import appStyles from "../../App.module.css";

function ContributorsBanner({ project_id }) {
  const [participants, setParticipants] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/participants`);
        setParticipants(data);
        // console.log(participants.results);
      } catch (err) {
        console.log(err);
      }
    };

    
    
    handleMount();
  }, [project_id]);

  return (
    <>
      {participants?.results?.length ? (
        <>
          <Card.Subtitle>Contributors</Card.Subtitle>
          <br />
          <ListGroup horizontal>
            {participants?.results
              .filter((participant) => participant.project_id === project_id)
              .map((participant) => (
                <ListGroup.Item key={participant.participant_id}>
                  <Card.Link
                    className={appStyles.Links}
                    href={`/profiles/${participant.participant_id}`}
                  >
                    <Contributor
                      key={participant.id}
                      {...participant}
                      setParticipants={setParticipants}
                    />
                  </Card.Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </>
      ) : (
        "Be the first to contribute to this project"
      )}
    </>
  );
}

export default ContributorsBanner;
