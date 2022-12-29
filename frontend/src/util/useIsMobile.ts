import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export const useIsMobile = (breakpoint: Breakpoint = "sm") => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));

  return isMobile;
};
