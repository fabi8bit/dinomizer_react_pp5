import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axios.Defaults';
import Profile from './Profile';

const ProfilePage = () => {

  const {id} = useParams();
  const [profile, setProfile] = useState( {results: []});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: profile}] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
        ])
        setProfile({results: [profile]})
        console.log(profile)
      } catch(err) {}
    }

    handleMount();
  },[id])

  return (
    <Row>
      <Col>
        <Container>
          <Profile {...profile.results[0]}/>
        </Container> 
      </Col>
    </Row>
  )
}

export default ProfilePage