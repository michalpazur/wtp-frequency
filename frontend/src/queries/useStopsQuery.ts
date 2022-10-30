import { useQuery } from "@tanstack/react-query";
import { BBox } from "geojson";
import { getStops } from "../services/getStops";

export const useStopsQuery = (bbox?: BBox) =>
  useQuery(
    ["stops", bbox],
    async () =>
      bbox &&
      (await getStops({
        minLat: bbox?.[0],
        minLon: bbox?.[1],
        maxLat: bbox?.[2],
        maxLon: bbox?.[3],
      })),
    {
      cacheTime: 0,
      enabled: bbox?.[0] !== undefined,
    }
  );
