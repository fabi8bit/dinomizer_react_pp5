import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axios.Defaults";
import { useCurrentUser } from "../../context/CurrentUserContext";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col
        className="py-2 mx-auto text-center"
        md={6}
      >
        <Container>
          <h1>Change password for {currentUser.username}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                <h5>New password</h5>
              </Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
              >
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>
                <h5>Confirm password</h5>
              </Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
              >
                {message}
              </Alert>
            ))}
            <Row>
              <Col>
                <Button
                  variant="warning"
                  type="submit"
                  block
                >
                  save
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => history.goBack()}
                  block
                >
                  cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;
