import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../styles/ProjectAsset.module.css";

function DeleteModal({ id, type, name, change, deleteitem }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, [id, type, name]);

  //   useEffect(() => {
  //     setShow(true);
  //   }, []);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
      >
        <div className={styles.BackgroundDark}>
        <Modal.Header closeButton>
          <Modal.Title>{`Are you sure you want to delete ${type} ${name}?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Think about it, baby! This is not reversible!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(event) => {
              handleClose();
              change();
            }}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={(event) => {
              handleClose();
              deleteitem();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;
