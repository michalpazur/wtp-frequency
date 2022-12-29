import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const InfoButton: React.FC = () => {
  return (
    <Button
      size="small"
      variant="outlined"
      color="inherit"
      aria-label="Pokaż informacje o projekcie"
      component={Link}
      to="/info"
    >
      <InfoIcon />
    </Button>
  );
};

export default InfoButton;
