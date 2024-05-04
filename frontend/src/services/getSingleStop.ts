import { axios } from "../util/axios";
import { getDate } from "../util/getDate";

export interface SingleStopResponse {
  [line: string]: string[];
}

export const getSingleStop = async (stopId: string | undefined, date?: Date) =>
  (
    await axios.get<SingleStopResponse>(`/stops/${stopId}`, {
      params: { date: getDate(date) },
    })
  ).data;
