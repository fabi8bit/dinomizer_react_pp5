import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Placeholder.module.css";


const Placeholder = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Placeholder} p-4`}>
      {spinner && <Spinner animation="grow" variant="warning" />}
      {src && <div>{src}</div>}
      {message && <h3 className="mt-4">{message}</h3>}
    </div>
  );
};

export default Placeholder;