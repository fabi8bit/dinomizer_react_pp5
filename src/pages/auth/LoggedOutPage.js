import React from "react";
import { Button, Col, Container, Image, Jumbotron, Row } from "react-bootstrap";
import styles from "../../styles/LoggedOutPage.module.css";
import logo from "../../project-assets/dm-logo-orig-white-txt.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

const LoggedOutPage = () => {
  useRedirect("loggedIn");

  return (
    <Row className={`${styles.Row} d-flex align-items-center`}>
      <Col>
        <Jumbotron className={styles.BackgroundBox} fluid>
          <Container>
            <h1>
              Your digital media
              <br />
              organized in one place
            </h1>
            <p>
              Create projects, join projects, assign assets and check them from
              anywhere
            </p>
          </Container>
        </Jumbotron>
        <Row>
          <Col>
            <Link
              exact
              to="/signin"
            >
              <Button
                variant="success"
                block
              >
                Sign in
              </Button>
            </Link>
          </Col>
          <Col>
            <Link
              exact
              to="/signup"
            >
              <Button
                variant="primary"
                block
              >
                Sign up
              </Button>
            </Link>
          </Col>
        </Row>

        {/* <Container >
          <p className={styles.Para}>You are currently logged out!!!</p>
          <Link
            exact
            to="/signin"
          >
            <Button
              variant="warning"
              block
            >
              Sign in
            </Button>
          </Link>
          <p>or</p>
          <Link
            exact
            to="/signup"
          >
            <Button
              variant="warning"
              block
            >
              Sign up
            </Button>
          </Link>
          <p>to access Dinomizer</p>
        </Container> */}
      </Col>
      <Col>
        <Container>
          <Image
            className={styles.FillerImage}
            src={logo}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default LoggedOutPage;
