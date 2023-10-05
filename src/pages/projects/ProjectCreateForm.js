import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ProjectCreateUpdate.module.css"
import { Alert } from "react-bootstrap";
import Placeholder from "../../components/Placeholder";
import UploadFileIcon from '@mui/icons-material/UploadFile';


function ProjectCreateForm() {

  const [errors, setErrors] = useState({});


  const textFields = (
    <>
      <Form.Group>
        <Form.Label>
          <h5>Project name:</h5>
        </Form.Label>
        <Form.Control
          as="input"
          name="project_name"
          rows={7}
        />
        <Button
            onClick={() => {}}
            aria-label="edit-password"
            
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
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" sm={12} lg={6}>
          <Container
            className= "d-flex flex-column justify-content-center"
          >
            <Form.Group className={`${styles.Boxbackground}`}>
              
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Placeholder src={<UploadFileIcon/>} message="Click or tap to upload a cover Image"/>
                </Form.Label>

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col className="d-none d-md-block p-0 p-md-2">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProjectCreateForm;