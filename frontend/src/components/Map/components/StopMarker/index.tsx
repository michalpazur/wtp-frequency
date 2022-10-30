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
  backgroundColor: theme.palette.secondary.main,
  borderWidth: 4,
  borderStyle: "solid",
  borderColor: theme.palette.background.paper,
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
