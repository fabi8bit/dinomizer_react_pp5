import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axios.Defaults";
import Profile from "./Profile";
import { BackButton } from "../../components/BackButton";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({ results: [] });
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
        ]);
        setProfile({ results: [profile] });
      } catch (err) {
        history.push("/notfound/");
      }
    };
    handleMount();
  }, [id, history]);

  return (
    <>
      <Profile {...profile.results[0]} />
      <BackButton />
    </>
  );
};

export default ProfilePage;
