import { FeatureCollection, LineString, MultiLineString } from "geojson";
import { axios } from "../util/axios";
import { getDate } from "../util/getDate";

export interface SegmentInfo {
  tripCount: number;
  bin: number;
}

export type SegmentCollecton = FeatureCollection<
  LineString | MultiLineString,
  SegmentInfo
>;

export const getShapes = async (date?: Date) =>
  (
    await axios.get<SegmentCollecton>("/shapes", {
      params: { date: getDate(date) },
    })
  ).data;
