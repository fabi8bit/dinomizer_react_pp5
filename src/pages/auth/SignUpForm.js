import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../../assets/dm-logo-orig-white-txt.png";
import styles from "../../styles/SignInUpForm.module.css"


const SignUpForm = () => {
  return (
    <Row className={`${styles.Row} d-flex align-items-center`} >
      <Col lg={6} sm={12}>
        <Container>
        <h1 className={styles.Header}>Sign up</h1>
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
              />
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
              />
            </Form.Group>
            <Button
              variant="outline-warning"
              type="submit"
            >
              Submit
            </Button>
          </Form>
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

export default SignUpForm;
