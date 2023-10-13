import React from 'react';
import styles from "../styles/ControllerFixed.module.css"
import SideBar from './Sidebar';

function ControllerFixed() {
  return (
    <div className={styles.ControllerFixed}>
      <SideBar/>
    </div>
  );
}

export default ControllerFixed;
