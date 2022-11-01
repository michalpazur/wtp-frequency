import React from "react";
import { Button, styled, Zoom } from "@mui/material";
import { useThemeStore } from "../../util/store/useThemeStore";
import {
  LightModeOutlined as LightMode,
  DarkModeOutlined as DarkMode,
} from "@mui/icons-material";
import { iconStyles } from "./styles";

const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ThemeButton: React.FC = () => {
  const { dark, setTheme } = useThemeStore();

  const handleButtonPress = () => {
    setTheme(!dark);
  };

  return (
    <StyledButton
      size="small"
      variant="outlined"
      color="inherit"
      onClick={handleButtonPress}
      aria-label="Zmień temat graficzny"
    >
      <Zoom in={dark}>
        <LightMode sx={iconStyles} />
      </Zoom>
      <Zoom in={!dark}>
        <DarkMode sx={iconStyles} />
      </Zoom>
    </StyledButton>
  );
};

export default ThemeButton;
