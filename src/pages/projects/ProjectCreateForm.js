import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ProjectCreateUpdate.module.css";
import btnStyles from "../../styles/Button.module.css"
import { Alert, Image } from "react-bootstrap";
import Placeholder from "../../components/Placeholder";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function ProjectCreateForm() {
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
          variant="warning"
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
      <Form.Group>
        <Form.Label>
          <h5>Status</h5>
        </Form.Label>
        <Form.Control
          id="matchLevel"
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
      {errors.level?.map((message, idx) => (
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
            onClick={() => {}}
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
    <Form>
      <Row>
        <Col
          className="py-2 p-0 p-md-2"
          sm={12}
          lg={6}
        >
          
            <Form.Group className={`${styles.Boxbackground}`}>
              {image ? (
                <>
                  <figure>
                    <Image
                      className={styles.FillerImage}
                      src={image}
                      rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >Change project image
                    </Form.Label>
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
              />
            </Form.Group>

            <div className="d-md-none">{textFields}</div>
         
        </Col>
        <Col className="d-none d-md-block p-0 p-md-2">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
    </Container>
  );
}

export default ProjectCreateForm;
