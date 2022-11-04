import { axios } from "../util/axios";

export interface SingleStopResponse {
  [line: string]: string[]
}

export const getSingleStop = async (stopId?: string) =>
  (await axios.get<SingleStopResponse>(`/stops/${stopId}`)).data;
