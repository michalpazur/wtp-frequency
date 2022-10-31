import React from "react";
import { Button, styled, Zoom } from "@mui/material";
import { useThemeStore } from "../../util/store/useThemeStore";
import {
  LightModeOutlined as LightMode,
  DarkModeOutlined as DarkMode,
} from "@mui/icons-material";
import { iconStyles } from "./styles";

const StyledButton = styled(Button)({
  position: "absolute",
  top: "20px",
  left: "20px",
});

const ThemeButton: React.FC = () => {
  const { dark, setTheme } = useThemeStore();

  const handleButtonPress = () => {
    setTheme(!dark);
  };

  return (
    <StyledButton
      size="small"
      color="inherit"
      onClick={handleButtonPress}
      aria-label="Zmień temat graficzny"
    >
      <Zoom in={!dark}>
        <LightMode sx={iconStyles} />
      </Zoom>
      <Zoom in={dark}>
        <DarkMode sx={iconStyles} />
      </Zoom>
    </StyledButton>
  );
};

export default ThemeButton;
