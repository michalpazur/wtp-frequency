import { CloseRounded as CloseIcon } from "@mui/icons-material";
import { Box, Button, Card, Slide, styled, Typography } from "@mui/material";
import React from "react";
import { useStopStore } from "../../util/store/useStopStore";
import {
  closeButton,
  stopName as stopNameStyle,
  stopNameContainer,
} from "./styles";
import { StopInfoProps } from "./types";

const MAX_WIDTH = 400;

const Wrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: "100%",
  maxWidth: MAX_WIDTH,
  [theme.breakpoints.down(MAX_WIDTH + 8 * 2 * 2)]: {
    left: theme.spacing(2),
    width: "unset",
  },
}));

const StopNameContainer = styled(Card)(({ theme }) => ({
  flexGrow: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StopInfo = React.forwardRef<HTMLDivElement, StopInfoProps>(
  ({ onClose }, ref) => {
    const { stopName } = useStopStore();

    return (
      <Wrapper ref={ref}>
        <Box sx={stopNameContainer}>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={onClose}
            sx={closeButton}
          >
            <CloseIcon />
          </Button>
          <StopNameContainer variant="outlined">
            <Typography variant="h2" sx={stopNameStyle}>
              {stopName}
            </Typography>
          </StopNameContainer>
        </Box>
      </Wrapper>
    );
  }
);

const StopInfoWrapper: React.FC = () => {
  const { stopId, setActiveStopId, setActiveStopName } = useStopStore();

  const onClose = () => {
    setActiveStopId();
  };

  const onExited = () => {
    if (!stopId) {
      setActiveStopName();
    }
  };

  return (
    <Slide in={!!stopId} direction="left" onExited={onExited} unmountOnExit>
      <StopInfo onClose={onClose} />
    </Slide>
  );
};

export default StopInfoWrapper;
