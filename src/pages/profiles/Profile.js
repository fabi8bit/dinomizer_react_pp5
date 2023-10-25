import React from "react";
import styles from "../../styles/Profile.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import LoggedOutPage from "../auth/LoggedOutPage";
import { removeTokenTimestamp } from "../../utility/utility";
import { BackButton } from "../../components/BackButton";

const Profile = (props) => {
  const { id, owner, created_at, updated_at, name, is_owner, image, content } =
    props;

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/loggedout");
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  const loggedInProfilePage = (
    <>
      <Row className={`${styles.Row} d-flex align-items-center`}>
        <Col>
          <Container>
            <Row>
              <Image
                className={styles.ProfImage}
                src={image}
                height="280"
                width="280"
              />
            </Row>
            {is_owner && (
              <>
                <Row>
                  <Col>
                    <Button
                      onClick={() => history.push(`/profiles/${id}/edit`)}
                      aria-label="edit-profile"
                      variant="primary"
                      block
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      onClick={handleSignOut}
                      block
                    >
                      Sign out
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Col>
        <Col
          lg={6}
          sm={12}
        >
          <Container>
            <Row>
              <Col>
                <h1 className={styles.Header}>Profile of {owner}</h1>
                <hr></hr>
                <h5>Real name:</h5>
                <p className={styles.Paragraphs}>
                  <strong>{name}</strong>
                </p>
                <hr></hr>
                <h5>Bio:</h5>
                <p className={styles.Paragraphs}>{content}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr></hr>
                <h5>Registration date:</h5>
                <p className={styles.Paragraphs}>{created_at}</p>
              </Col>
              <Col>
                <hr></hr>
                <h5>Last profile update:</h5>
                <p className={styles.Paragraphs}>{updated_at}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );

  return loggedInProfilePage;
};

export default Profile;
