import { Request, Response } from "express";
import { Empty, MessageResponse } from "../../../types";
import { GetAllStopsQuery, StopPoint, StopPointCollection } from "../types";
import { readFile } from "fs/promises";
import path from "path";
import { FeatureCollection, Feature, Point, GeometryCollection } from "geojson";

export const getAllStops = async (
  req: Request<Empty, Empty, Empty, GetAllStopsQuery>,
  res: Response<MessageResponse | StopPointCollection>
) => {
  const keys: (keyof GetAllStopsQuery)[] = [
    "minLat",
    "maxLat",
    "minLon",
    "maxLon",
  ];

  for (const key of keys) {
    if (!req.query[key]) {
      return res.json({ message: `${key} is required!` });
    }
  }

  const { minLat, maxLat, minLon, maxLon } = req.query;

  try {
    const fileContents = await readFile(path.join("data", "stops.json"), { encoding: "utf-8" });
    const geoJSON = JSON.parse(fileContents) as StopPointCollection;

    geoJSON.features = geoJSON.features.filter((point) => {
      const coords = point.geometry.coordinates;
      const lat = coords[1];
      const lon = coords[0];
      return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
    });

    res.json(geoJSON);
  } catch (e: any) {
    res.status(500);
  }
};
