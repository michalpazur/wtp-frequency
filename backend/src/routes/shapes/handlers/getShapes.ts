import { Response, Request } from "express";
import path from "path";
import { DateQuery, Empty } from "../../../types";
import { getDate } from "../../../util/getDate";
import { SegmentCollection } from "../types";

export const getShapes = async (
  req: Request<Empty, Empty, Empty, DateQuery>,
  res: Response<SegmentCollection>
) => {
  const date = await getDate(req);
  res.sendFile("lines.json", {
    root: path.join("data", date),
  });
};
