import { styled } from "@mui/material";
import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

const Map = styled(MapContainer)<MapContainerProps>(() => ({
  height: "100vh",
  width: "100vw",
}));

const App: React.FC = () => {
  return (
    <Map center={[52.22983, 21.01214]} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
    </Map>
  );
};

export default App;
