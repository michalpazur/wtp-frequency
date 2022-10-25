import express from "express";
import { getAllStops } from "./handlers/getAllStops";
import { getSingleStop } from "./handlers/getSingleStop";

const router = express.Router();
router.get("/", getAllStops);
router.get("/:stopId", getSingleStop);

export { router as stopRouter };
