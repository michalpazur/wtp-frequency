import { Request } from "express";
import { DateQuery, Empty } from "../types";
import { getDataFolders } from "./getDataFolders";

export const getDate = async (req: Request<Empty, Empty, Empty, DateQuery>) => {
  let date = req.query.date;
  const allDates = await getDataFolders(true);

  if (!allDates.includes(date)) {
    date = allDates[0];
  }

  return date.replace(/-/g, "_");
};
