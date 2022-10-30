import { StopPointCollection } from "../../../../services/getStops";

export interface StopMarkerProps {
  marker: StopPointCollection["features"][0];
}
