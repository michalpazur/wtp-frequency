import { Box, styled } from "@mui/material";
import React from "react";
import { Marker } from "react-map-gl";
import { StopMarkerProps } from "./types";

const RoundIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 15,
  height: 15,
  borderRadius: 20,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  borderWidth: 4,
  borderStyle: "solid",
  borderColor: theme.palette.text.primary,
  tranition: theme.transitions.create(["background-color", "border-color"], {
    duration: theme.transitions.duration.standard,
  }),
}));

const StopMarker: React.FC<StopMarkerProps> = ({ marker }) => {
  const [lon, lat] = marker.geometry.coordinates;

  return (
    <Marker longitude={lon} latitude={lat} anchor="center">
      <RoundIcon />
    </Marker>
  );
};

export default StopMarker;
