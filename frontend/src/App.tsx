import { PaletteOptions, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Map from "./components/Map";
import ThemeButton from "./components/ThemeButton";
import { useThemeStore } from "./util/store/useThemeStore";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const lightPalette: PaletteOptions = {
  primary: {
    main: "#007FFF",
  },
  secondary: {
    main: "#173A5E",
  },
  text: {
    primary: "#181C1C",
  },
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#3399FF",
  },
  secondary: {
    main: "#001E3C",
  },
};

const defaultTheme = createTheme();

const App: React.FC = () => {
  const darkModeDefault = useMediaQuery("(prefers-color-scheme: dark)");
  const { dark, changed, setThemeAuto } = useThemeStore();

  useEffect(() => {
    if (!changed) {
      setThemeAuto(darkModeDefault);
    }
  }, [changed, darkModeDefault, setThemeAuto]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["'Work Sans'", "sans-serif"].join(", "),
        },
        palette: dark ? darkPalette : lightPalette,
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              text: {
                boxShadow: defaultTheme.shadows[5],
              },
              sizeSmall: {
                padding: 10,
                minWidth: 40,
                height: 40,
                backdropFilter: "blur(5px)",
              },
            },
          },
        },
      }),
    [dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Map />
      <ThemeButton />
    </ThemeProvider>
  );
};

export default App;
