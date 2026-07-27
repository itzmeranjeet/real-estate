import express from "express";
import { getPricingPlans } from "../controllers/pricingPlan.js";

const router = express.Router();

router.get("/", getPricingPlans);

export default router;