import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  typography: {
    fontFamily: ["'Work Sans'", "sans-serif"].join(", "),
  },
  palette: {
    primary: {
      main: "#007FFF",
    },
    secondary: {
      main: "#173A5E",
    },
    text: {
      primary: "#181C1C",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
