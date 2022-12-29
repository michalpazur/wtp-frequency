import { Stack, styled } from "@mui/material";
import React from "react";
import { useIsMobile } from "../../util/useIsMobile";
import CalendarButton from "./components/CalendarButton";
import InfoButton from "./components/InfoButton";
import ThemeButton from "./components/ThemeButton";

const Root = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    bottom: theme.spacing(2),
    top: "unset",
  },
}));

const ButtonContainer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <Root spacing={1} direction={isMobile ? "column-reverse" : "column"}>
      <ThemeButton />
      <InfoButton />
      <CalendarButton />
    </Root>
  );
};

export default ButtonContainer;
