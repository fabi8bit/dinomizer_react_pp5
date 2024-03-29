import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const BackButton = () => {
  const history = useHistory();
  return (
    <Row className="justify-content-center mb-4">
      <Col style={{display:'contents'}}>
        <Button
          variant="warning"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
      </Col>
    </Row>
  );
};
