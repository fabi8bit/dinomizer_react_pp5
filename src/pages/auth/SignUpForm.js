import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../../assets/dm-logo-orig-white-txt.png";
import styles from "../../styles/SignInUpForm.module.css"


const SignUpForm = () => {
  return (
    <Row>
      <Col sm={12}>
        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Check me out"
              />
            </Form.Group>
            <Button
              variant="primary"
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
