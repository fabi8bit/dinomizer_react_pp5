import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ProjectCreateUpdate.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import Placeholder from "../../components/Placeholder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axios.Defaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

function ProjectEditForm() {
  useRedirect("loggedOut")
  const [errors, setErrors] = useState({});

  const [projectData, setProjectData] = useState({
    project_name: "",
    content: "",
    image: "",
    start_date: "",
    expected_end_date: "",
    status: "",
  });
  const {
    project_name,
    content,
    image,
    start_date,
    expected_end_date,
    status,
  } = projectData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/${id}/`);
        const {
          project_name,
          content,
          image,
          start_date,
          expected_end_date,
          status,
          is_owner,
        } = data;

        is_owner
          ? setProjectData({
              project_name,
              content,
              image,
              start_date,
              expected_end_date,
              status,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChangeDate = (oldDate) => {
    //leaving the date field empty is trowing an error
    //because of .toISOString method.
    //So a try-catch block is necessary
    try {
      const newDate = new Date(oldDate);
      return newDate.toISOString();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      // computed name property - creates key - value pair
      // between brackets sets the key - [event.target.name]
      // after the colon sets the value - : event.target.value
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProjectData({
        ...projectData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    //the date picker format is not compatible with Django rf API
    //the format accepted by DRF is not compatible with the date picker used here
    //For that reason we have to convert in the format accepted by DRF
    //  right before to submit using handleChangeDate
    let startDate = handleChangeDate(start_date);
    let endDate = handleChangeDate(expected_end_date);

    formData.append("project_name", project_name);
    formData.append("content", content);
    // formData.append("image", imageInput.current.files[0]);
    formData.append("start_date", startDate);
    formData.append("expected_end_date", endDate);
    formData.append("status", status);

    if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
      }

    try {
      await axiosReq.put(`/projects/${id}/`, formData);
      history.push(`/projects/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>
          <h5>Project name:</h5>
        </Form.Label>
        <Form.Control
          as="input"
          name="project_name"
          value={project_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.project_name?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Content:</h5>
        </Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Start date</h5>
        </Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.start_date?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Expected end date</h5>
        </Form.Label>
        <Form.Control
          type="date"
          name="expected_end_date"
          value={expected_end_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.expected_end_date?.map((message, idx) => (
        <Alert
          variant="danger"
          key={idx}
        >
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <h5>Status</h5>
        </Form.Label>
        <Form.Control
          id="status"
          as="select"
          name="status"
          value={status}
          onChange={handleChange}
        >
          <option>Planned</option>
          <option>InProgress</option>
          <option>Completed</option>
        </Form.Control>
      </Form.Group>
      {errors?.status?.map((message, idx) => (
        <Alert
          variant="danger"
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
          <Col
            sm={12}
            lg={6}
          >
            <Container>
              <Form.Group className={`${styles.Boxbackground}`}>
                {image ? (
                  <>
                    <figure>
                      <Image
                        className={styles.FillerImage}
                        src={image}
                        fluid
                      />
                    </figure>
                    <div>
                      <Col>
                        <Form.Label
                          className={`${btnStyles.Button} ${btnStyles.Yellow} btn`}
                          htmlFor="image-upload"
                        >
                          Change project image
                        </Form.Label>
                      </Col>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Placeholder
                      src={<UploadFileIcon />}
                      message="Click or tap to upload a cover Image"
                    />
                  </Form.Label>
                )}
                <Form.File
                  className={styles.FormControl}
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  display="none"
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert
                  variant="danger"
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col className="d-none d-md-block p-0 p-md-2">
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ProjectEditForm;