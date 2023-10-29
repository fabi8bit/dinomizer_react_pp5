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
      <Col lg={6} sm={12}>
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
      </Col>
      <Col>
        <Container>
          <Image
            className={styles.FillerImage}
            src={logo}
            alt="logo dinomizer"
          />
        </Container>
      </Col>
    </Row>
  );
};

export default LoggedOutPage;
