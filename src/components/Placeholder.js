import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Placeholder.module.css";


const Placeholder = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Placeholder} p-4`}>
      {spinner && <Spinner animation="grow" variant="warning" />}
      {src && <div>{src}</div>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Placeholder;