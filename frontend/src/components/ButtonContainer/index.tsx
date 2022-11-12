import { styled } from "@mui/material";
import React from "react";
import InfoButton from "./components/InfoButton";
import ThemeButton from "./components/ThemeButton";

const Root = styled("div")(({ theme }) => ({
  display: "grid",
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    bottom: theme.spacing(2),
    top: "unset",
  },
}));

const ButtonContainer: React.FC = () => {
  return (
    <Root>
      <ThemeButton />
      <InfoButton />
    </Root>
  );
};

export default ButtonContainer;
