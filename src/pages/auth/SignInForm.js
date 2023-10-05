import React, { useState} from "react";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../../project-assets/dm-logo-orig-white-txt.png";
import styles from "../../styles/SignInUpForm.module.css"
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSetCurrentUser } from "../../context/CurrentUserContext";


const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} d-flex align-items-center`} >
      <Col lg={6} sm={12}>
        <Container>
        <h1 className={styles.Header}>Sign in</h1>
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
              <Alert variant="danger" key={idx}>
                Username - {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant="danger" key={idx}>
                Password - {message}
              </Alert>
            ))}

            <Button
              variant="warning"
              type="submit"
              block
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="danger" className="mt-3">
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

export default SignInForm;
