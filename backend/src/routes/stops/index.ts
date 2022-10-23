import express from "express";
import { getAllStops } from "./handlers/getAllStops";

const router = express.Router();
router.get("/", getAllStops);

export { router as stopRouter };
