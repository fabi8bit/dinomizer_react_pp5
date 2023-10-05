import React from "react";
import styles from "../styles/NavBar.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../project-assets/dm-logo-navbar.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ExtensionIcon from '@mui/icons-material/Extension';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const loggedOutIcons = (
    <>
      <NavLink
        exact
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <LoginIcon className={styles.Icon} />
        Sign in
      </NavLink>
      <NavLink
        exact
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <PersonAddIcon className={styles.Icon} />
        Sign up
      </NavLink>
    </>
  );

  const loggedInIcons = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <ViewTimelineIcon className={styles.Icon} />
        Timeline
      </NavLink>
      <NavLink
        exact
        to="/projects"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <WebAssetIcon className={styles.Icon} />
        projects
      </NavLink>
      <NavLink
        exact
        to="/contributes"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <ExtensionIcon className={styles.Icon} />
        Contribute
      </NavLink>
      <NavLink
        exact
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <Avatar src={currentUser?.profile_image} height={30} />
        <strong>{currentUser?.username}</strong>
      </NavLink>
    </>
  );

  
  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="logo"
            height="35"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
