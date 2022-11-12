import { Response, Request } from "express";
import path from "path";
import { SegmentCollection } from "../types";

export const getShapes = (req: Request, res: Response<SegmentCollection>) => {
  res.sendFile("lines.json", { root: "data" });
};
