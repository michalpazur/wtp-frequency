import { FeatureCollection, LineString, MultiLineString } from "geojson";

interface SegmentInfo {
  tripCount: number;
  bin: number;
}

export type SegmentCollection = FeatureCollection<LineString | MultiLineString, SegmentInfo>;