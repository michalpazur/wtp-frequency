import { FeatureCollection, LineString, MultiLineString } from "geojson";
import { axios } from "../util/axios";

export interface SegmentInfo {
  tripCount: number;
  bin: number;
}

export type SegmentCollecton = FeatureCollection<
  LineString | MultiLineString,
  SegmentInfo
>;

export const getShapes = async (date?: string) =>
  (await axios.get<SegmentCollecton>("/shapes", { params: { date } })).data;
