import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import logo from "../../project-assets/dm-logo-orig-white-txt.png";
import styles from "../../styles/SignInUpForm.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    password1: "",
    username: "",
    password2: "",
  });

  const { password1, username, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} d-flex align-items-center`}>
      <Col
        lg={6}
        sm={12}
      >
        <Container>
          <h1 className={styles.Header}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert
                variant="danger"
                key={idx}
              >
                Username - {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert
                variant="danger"
                key={idx}
              >
                Password - {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert
                variant="danger"
                key={idx}
              >
                Confirm password - {message}
              </Alert>
            ))}

            <Button
              variant="warning"
              type="submit"
              block
            >
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert
                key={idx}
                variant="danger"
                className="mt-3"
              >
                {message}
              </Alert>
            ))}
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
