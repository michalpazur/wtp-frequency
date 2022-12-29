import { axios } from "../util/axios";

export interface SingleStopResponse {
  [line: string]: string[];
}

export const getSingleStop = async (
  stopId: string | undefined,
  date: string | undefined
) =>
  (
    await axios.get<SingleStopResponse>(`/stops/${stopId}`, {
      params: { date },
    })
  ).data;
