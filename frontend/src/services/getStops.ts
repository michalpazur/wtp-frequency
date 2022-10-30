import { axios } from "../util/axios";
import { FeatureCollection, Point } from "geojson";

export interface GetAllStopsQuery {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

interface StopPoint {
  stopId: string;
  stopName: string;
}

export type StopPointCollection = FeatureCollection<Point, StopPoint>;

export const getStops = async (params: GetAllStopsQuery) =>
  (await axios.get<StopPointCollection>("/stops", { params })).data;
