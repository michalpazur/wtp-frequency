import { useQuery } from "@tanstack/react-query";
import { getShapes } from "../services/getShapes";

export const useShapeQuery = () =>
  useQuery(["shape"], async () => await getShapes());
