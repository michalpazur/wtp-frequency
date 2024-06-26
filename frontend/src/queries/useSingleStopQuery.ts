import { useQuery } from "@tanstack/react-query";
import { getSingleStop } from "../services/getSingleStop";

export const useSingleStopQuery = (stopId: string | undefined, date?: Date) =>
  useQuery(["stop", stopId, date], async () => await getSingleStop(stopId, date), {
    enabled: !!stopId && !!date,
  });
