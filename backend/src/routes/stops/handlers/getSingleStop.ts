import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { DateQuery, Empty, MessageResponse } from "../../../types";
import { getDate } from "../../../util/getDate";
import { SingleStopParams, SingleStopResponse, StopLookup } from "../types";

export const getSingleStop = async (
  req: Request<SingleStopParams, Empty, Empty, DateQuery>,
  res: Response<MessageResponse | SingleStopResponse>
) => {
  const { stopId } = req.params;
  const date = await getDate(req);

  try {
    const fileContents = await readFile(path.join("data", date, "stop_info.json"), {
      encoding: "utf-8",
    });
    const stopLookup = JSON.parse(fileContents) as StopLookup;
    const stop = stopLookup[stopId];
    if (!stop) {
      return res
        .status(404)
        .json({ message: `Stop with id ${stopId} doesn't exist!` });
    }

    res.json(stop);
  } catch (e: any) {
    res.status(500);
  }
};
