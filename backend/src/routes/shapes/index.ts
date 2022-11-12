import express from "express";
import { getShapes } from "./handlers/getShapes";

const router = express.Router();
router.get("/", getShapes);

export { router as shapesRouter };
