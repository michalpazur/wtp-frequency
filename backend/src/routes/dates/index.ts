import express from "express";
import { getDates } from "./handlers/getDates";

const router = express.Router();
router.get("/", getDates);

export { router as datesRouter };
