// src/routes/index.ts
import { Router } from "express";
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";
import MFARoutes from "./mfa.route";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Health check
router.get("/health", (_, res) => { res.status(200).json({ status: "ok" }) });

// Public routes
router.use("/v1/auth", AuthRoutes);

// Protected routes
router.use("/v1/users", authenticate, UserRoutes);
router.use("/v1/mfa",MFARoutes)

export default router;
