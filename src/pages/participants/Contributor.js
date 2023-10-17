import { Avatar } from "@mui/material";
import React from "react";

const Contributor = (props) => {
  const { participant_image } = props;

  return (
    <Avatar
      src={participant_image}
      height={30}
    />
  );
};

export default Contributor;
