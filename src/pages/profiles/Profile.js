import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Col, Container, Image, Row } from "react-bootstrap";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const {
    id,
    owner,
    created_at,
    updated_at,
    name,
    is_owner,
    image,
    content,
    imageSize = 120,
  } = props;

  const currentUser = useCurrentUser();

  return (
    <Row className={`${styles.Row} d-flex align-items-center`}>
      <Col
        lg={6}
        sm={12}
      >
        <Container>
            <div>User: {owner}</div>
            <div>Name: {name}</div>
            <p>Bio: {content}</p>
            <div>Registration date: {created_at}</div>
            <div>Last profile update: {updated_at}</div>
        </Container>
      </Col>
      <Col>
        <Container>
          <Avatar src={image} height={imageSize}/>
        </Container>
      </Col>
    </Row>
  );
};

export default Profile;
