import { BBox } from "geojson";
import maplibre from "maplibre-gl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMap, { MapRef } from "react-map-gl";
import { useStopsQuery } from "../../queries/useStopsQuery";
import { StopPointCollection } from "../../services/getStops";
import StopMarker from "./components/StopMarker";

const START_ZOOM = 16;
const MAX_STOP_ZOOM = 14.5;

const Map: React.FC = () => {
  const mapRef = useRef<MapRef>(null);
  const [bounds, setBounds] = useState<BBox>();
  const [zoom, setZoom] = useState(START_ZOOM);
  const [stops, setStops] = useState<StopPointCollection["features"]>([]);
  const { data } = useStopsQuery(bounds);

  useEffect(() => {
    if (data) {
      setStops(data.features);
    }
  }, [data]);

  const handleViewportChange = useCallback(() => {
    // Prevent unnecessary stop request if stops are not displayed
    if (!mapRef.current) {
      return;
    }

    const zoom = mapRef.current.getZoom();
    setZoom(zoom);
    if (zoom < MAX_STOP_ZOOM) {
      return;
    }

    const bounds = mapRef.current.getBounds();
    const min = bounds.getSouthWest();
    const max = bounds.getNorthEast();
    setBounds([min.lat, min.lng, max.lat, max.lng]);
  }, []);

  return (
    <ReactMap
      mapLib={maplibre}
      mapStyle={`https://api.maptiler.com/maps/e7006e78-523a-488f-ace4-e7923fe085fb/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
      ref={mapRef}
      onLoad={handleViewportChange}
      onMoveEnd={handleViewportChange}
      style={{ width: "100vw", height: "100vh" }}
      initialViewState={{
        latitude: 52.229831,
        longitude: 21.011735,
        zoom: START_ZOOM,
      }}
    >
      {zoom >= MAX_STOP_ZOOM
        ? stops.map((stop) => (
            <StopMarker key={stop.properties.stopId} marker={stop} />
          ))
        : null}
    </ReactMap>
  );
};

export default Map;
