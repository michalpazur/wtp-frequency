import { useQuery } from "@tanstack/react-query";
import { getDates } from "../services/getDates";

export const useDatesQuery = () =>
  useQuery(["dates"], async () => await getDates());
