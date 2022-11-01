import { Box, styled } from "@mui/material";
import React from "react";
import { Marker } from "react-map-gl";
import { useStopStore } from "../../../../util/store/useStopStore";
import { MarkerIconProps, StopMarkerProps } from "./types";

const RoundIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<MarkerIconProps>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 15,
  height: 15,
  borderRadius: 20,
  boxShadow: theme.shadows[5],
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  borderWidth: 3,
  borderStyle: "solid",
  borderColor: theme.palette.text.primary,
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "border-color"], {
    duration: theme.transitions.duration.standard,
  }),
}));

const StopMarker: React.FC<StopMarkerProps> = ({ marker }) => {
  const markerId = marker.properties.stopId;
  const [lon, lat] = marker.geometry.coordinates;
  const { stopId, setActiveStop } = useStopStore();

  const onClick = () => {
    setActiveStop(marker.properties);
  };

  return (
    <Marker longitude={lon} latitude={lat} anchor="center" onClick={onClick}>
      <RoundIcon active={stopId === markerId} />
    </Marker>
  );
};

export default StopMarker;
