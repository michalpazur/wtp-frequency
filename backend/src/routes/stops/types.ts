import { FeatureCollection, Point } from "geojson";

export interface GetAllStopsQuery {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

export interface StopPoint {
  stopId: string;
  stopName: string;
}

export type StopPointCollection = FeatureCollection<Point, StopPoint>;

export interface SingleStopParams {
  stopId: string;
}

export interface SingleStopResponse {
  [line: string]: string[];
}

export interface StopLookup {
  [stopId: string]: SingleStopResponse;
}
