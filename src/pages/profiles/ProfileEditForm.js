import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axios.Defaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../context/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/Profile.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>
          <h5>Real Name:</h5>
        </Form.Label>
        <Form.Control
          as="input"
          value={name}
          onChange={handleChange}
          name="name"
          rows={7}
        />
        <Button
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
            className={styles.SignOutButton}
            variant="danger"
            block
          >
            Change password here!
          </Button>
        <Form.Label>
          <h5>Bio</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert
          variant="warning"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Row>
        <Col>
          <Button
            type="submit"
            variant="warning"
            block
          >
            save
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => history.goBack()}
            variant="secondary"
            block
          >
            cancel
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <Row>
        <h1>Edit {currentUser?.username}`&apos;` profile</h1>
      </Row>
      <Row>
        <Col>
          <Container>
            <Form.Group>
              {image && (
                <figure>
                  <Image
                    className={styles.FillerImage}
                    src={image}
                    fluid
                  />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert
                  variant="warning"
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${styles.Paragraphs}btn my-auto`}
                  htmlFor="image-upload"
                >
                  <h5>Change {currentUser?.username} picture</h5>
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col
          md={5}
          lg={6}
          className="d-none d-md-block p-0 p-md-2 text-center"
        >
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
    </Container>
  );
};

export default ProfileEditForm;
