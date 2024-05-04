import { useQuery } from "@tanstack/react-query";
import { BBox } from "geojson";
import { getStops } from "../services/getStops";
import { getDate } from "../util/getDate";

export const useStopsQuery = (bbox: BBox | undefined, date?: Date) =>
  useQuery(
    ["stops", bbox, date],
    async () =>
      bbox &&
      (await getStops({
        minLat: bbox?.[0],
        minLon: bbox?.[1],
        maxLat: bbox?.[2],
        maxLon: bbox?.[3],
        date: getDate(date),
      })),
    {
      cacheTime: 0,
      enabled: bbox?.[0] !== undefined && !!date,
    }
  );
