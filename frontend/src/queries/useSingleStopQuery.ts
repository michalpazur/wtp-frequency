import { useQuery } from "@tanstack/react-query";
import { getSingleStop } from "../services/getSingleStop";

export const useSingleStopQuery = (stopId: string | undefined) =>
  useQuery(
    ["stop", stopId],
    async () => await getSingleStop(stopId),
    { enabled: !!stopId }
  );
