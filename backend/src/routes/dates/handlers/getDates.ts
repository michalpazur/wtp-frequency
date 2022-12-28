import { Response, Request } from "express";
import { getDataFolders } from "../../../util/getDataFolders";

export const getDates = async (req: Request, res: Response<string[]>) => {
  const dates = await getDataFolders();
  res.send(dates);
};
