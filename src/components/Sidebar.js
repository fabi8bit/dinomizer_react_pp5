import React from "react";
import styles from "../styles/Sidebar.module.css"

import { SidebarData } from "./SidebarData";

const SideBar = () => {
  return (
    <div className={styles.Sidebar}>
      
      <ul className={styles.SidebarList}>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id={styles.icon}>{val.icon}</div> <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
