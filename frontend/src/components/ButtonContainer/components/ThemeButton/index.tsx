import {
  DarkModeOutlined as DarkMode,
  LightModeOutlined as LightMode,
} from "@mui/icons-material";
import { Button, Zoom } from "@mui/material";
import React from "react";
import { useThemeStore } from "../../../../util/store/useThemeStore";
import { iconStyles } from "./styles";

const ThemeButton: React.FC = () => {
  const { dark, setTheme } = useThemeStore();

  const handleButtonPress = () => {
    setTheme(!dark);
  };

  return (
    <Button
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
    </Button>
  );
};

export default ThemeButton;
