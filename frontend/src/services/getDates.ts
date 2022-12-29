import { axios } from "../util/axios";

export const getDates = async () => (await axios.get<string[]>("/dates")).data;
