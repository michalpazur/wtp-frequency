import { Slide, styled } from "@mui/material";
import React from "react";
import { useStopStore } from "../../util/store/useStopStore";
import LineList from "./components/LineList";
import StopName from "./components/StopName";

const MAX_WIDTH = 400;

const Wrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: "100%",
  maxWidth: MAX_WIDTH,
  maxHeight: `calc(100% - ${theme.spacing(4)})`,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down(MAX_WIDTH + 8 * 2 * 2)]: {
    left: theme.spacing(2),
    width: "unset",
  },
}));

const StopInfo: React.FC = () => {
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
      <Wrapper>
        <StopName onClose={onClose} />
        <LineList />
      </Wrapper>
    </Slide>
  );
};

export default StopInfo;
