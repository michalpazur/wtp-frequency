import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getShapes, SegmentCollecton } from "../services/getShapes";

export const useShapeQuery = (
  date: Date | undefined,
  queryOptions?: QueryOptions<SegmentCollecton>
) =>
  useQuery(["shape", date], async () => await getShapes(date), {
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
