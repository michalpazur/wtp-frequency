// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibre from "!maplibre-gl";
import { BBox } from "geojson";
import maplibreWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMap, { MapRef } from "react-map-gl";
import { useStopsQuery } from "../../queries/useStopsQuery";
import { StopPointCollection } from "../../services/getStops";
import { useThemeStore } from "../../util/store/useThemeStore";
import LineLayer from "./components/LineLayer";
import StopMarker from "./components/StopMarker";

// https://github.com/maplibre/maplibre-gl-js/issues/1011#issuecomment-1098482300
maplibre.workerClass = maplibreWorker;

const START_ZOOM = 16;
const MAX_STOP_ZOOM = 14.5;

const LIGHT_MAP = "71c6c9a9-0219-4f07-976b-58baaba616f1";
const DARK_MAP = "dbb5c6d1-d165-4e7b-89b5-06b258775ce3";

const Map: React.FC = () => {
  const mapRef = useRef<MapRef>(null);
  const [bounds, setBounds] = useState<BBox>();
  const [zoom, setZoom] = useState(START_ZOOM);
  const [stops, setStops] = useState<StopPointCollection["features"]>([]);
  const { data: stopsData } = useStopsQuery(bounds);
  const { dark } = useThemeStore();

  useEffect(() => {
    if (stopsData) {
      setStops(stopsData.features);
    }
  }, [stopsData]);

  const handleViewportChange = useCallback(() => {
    if (!mapRef.current) {
      return;
    }

    const zoom = mapRef.current.getZoom();
    setZoom(zoom);
    // Prevent unnecessary stop request if stops are not displayed
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
      mapStyle={`https://api.maptiler.com/maps/${
        dark ? DARK_MAP : LIGHT_MAP
      }/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
      ref={mapRef}
      onLoad={handleViewportChange}
      onMoveEnd={handleViewportChange}
      style={{ width: "100vw", height: "100%" }}
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
      <LineLayer />
    </ReactMap>
  );
};

export default Map;
