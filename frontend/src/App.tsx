import {
  createTheme,
  CssBaseline,
  PaletteOptions,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import ButtonContainer from "./components/ButtonContainer";
import InfoPage from "./components/InfoPage";
import Map from "./components/Map";
import StopInfo from "./components/StopInfo";
import { useThemeStore } from "./util/store/useThemeStore";

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

const defaultThemeLight = createTheme({ palette: lightPalette });

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#3399FF",
  },
  secondary: {
    main: "#265D97",
  },
};

const defaultThemeDark = createTheme({ palette: darkPalette });

const App: React.FC = () => {
  const darkModeDefault = useMediaQuery("(prefers-color-scheme: dark)");
  const { dark, changed, setThemeAuto } = useThemeStore();

  useEffect(() => {
    if (!changed) {
      setThemeAuto(darkModeDefault);
    }
  }, [changed, darkModeDefault, setThemeAuto]);

  const defaultTheme = useMemo(
    () => (dark ? defaultThemeDark : defaultThemeLight),
    [dark]
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["'Work Sans'", "sans-serif"].join(", "),
          h1: {
            fontSize: "1.75rem",
            fontWeight: "bold",
          },
          h2: {
            fontSize: "1.5rem",
            fontWeight: 500,
          },
        },
        palette: defaultTheme.palette,
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              outlined: {
                boxShadow: defaultTheme.shadows[5],
                borderColor: defaultTheme.palette.divider,
                backdropFilter: "blur(5px)",
              },
              sizeSmall: {
                padding: defaultTheme.spacing(1),
                minWidth: 40,
                height: 40,
              },
            },
          },
          MuiLink: {
            defaultProps: {
              target: "_blank",
              rel: "noopener",
              underline: "hover",
            },
          },
          MuiPaper: {
            styleOverrides: {
              outlined: {
                boxShadow: defaultTheme.shadows[5],
                backgroundColor: "transparent",
                backdropFilter: "blur(5px)",
              },
            },
          },
        },
      }),
    [defaultTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/wtp-frequency">
        <Routes>
          <Route path="info" element={<InfoPage />} />
          <Route
            path="*"
            element={
              <React.Fragment>
                <Map />
                <ButtonContainer />
                <StopInfo />
              </React.Fragment>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
