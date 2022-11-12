import { FeatureCollection, LineString, MultiLineString } from "geojson";
import { axios } from "../util/axios";

export interface SegmentInfo {
  tripCount: number;
  bin: number;
}

export type SegmentCollecton = FeatureCollection<LineString | MultiLineString, SegmentInfo>;

export const getShapes = async () =>
  (await axios.get<SegmentCollecton>("/shapes")).data;
