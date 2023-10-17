import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import styles from "../../styles/LoggedOutPage.module.css";
import logo from "../../project-assets/dm-logo-orig-white-txt.png";
import { Link } from "react-router-dom/cjs/react-router-dom";

const LoggedOutPage = () => {


  return (
    <Row className={`${styles.Row} d-flex align-items-center`}>
      <Col
        lg={6}
        sm={12}
      >
        <Container >
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
        </Container>
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
