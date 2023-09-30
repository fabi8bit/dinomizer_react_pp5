import React from "react";
import styles from "../styles/NavBar.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/dm-logo-navbar.svg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="logo"
            height="35"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
              <LoginIcon className={styles.Icon} />
              Sign in
            </NavLink>
            <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              <PersonAddIcon className={styles.Icon} />
              Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
