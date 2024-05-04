import {
  Box,
  createTheme,
  CssBaseline,
  PaletteOptions,
  SxProps,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
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

const root: SxProps = {
  overflow: "hidden",
  position: "absolute",
  top: 0,
  bottom: 0,
};

const App: React.FC = () => {
  const darkModeDefault = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersContrast = useMediaQuery("(prefers-contrast: more)");
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
                backgroundColor: prefersContrast
                  ? defaultTheme.palette.background.paper
                  : "transparent",
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
                backgroundColor: prefersContrast
                  ? defaultTheme.palette.background.paper
                  : "transparent",
                backdropFilter: "blur(5px)",
              },
            },
          },
          MuiPickersLayout: {
            styleOverrides: {
              root: ({ theme }) => ({
                position: "relative",
                backgroundColor: "unset !important",
                overflow: "unset !important",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }),
            },
          },
          MuiDatePickerToolbar: {
            styleOverrides: {
              root: ({ theme }) => ({
                borderRadius: theme.shape.borderRadius,
                background: `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                color: theme.palette.primary.contrastText,
                zIndex: "1",
                boxShadow: theme.shadows[2],
              }),
              title: ({ theme }) => ({
                color: theme.palette.primary.contrastText,
              }),
            },
          },
          MuiPickersCalendarHeader: {
            styleOverrides: {
              root: {
                width: "100%",
                maxWidth: "320px",
                marginLeft: "auto",
                marginRight: "auto",
              },
            },
          },
          MuiDateCalendar: {
            styleOverrides: {
              root: ({ theme }) => ({
                width: "100%",
                position: "relative",
                top: "-" + theme.shape.borderRadius + "px",
                border: "1px solid",
                borderColor: theme.palette.divider,
                borderBottomRightRadius: theme.shape.borderRadius,
                borderBottomLeftRadius: theme.shape.borderRadius,
              }),
            },
          },
          MuiYearCalendar: {
            styleOverrides: {
              root: {
                margin: "auto",
              },
            },
          },
        },
      }),
    [defaultTheme, prefersContrast]
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
              <Box sx={root}>
                <Map />
                <ButtonContainer />
                <StopInfo />
              </Box>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
