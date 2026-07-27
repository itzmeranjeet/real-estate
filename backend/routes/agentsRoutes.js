import express from "express";
import { getAllAgents } from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getAllAgents);

export default router;