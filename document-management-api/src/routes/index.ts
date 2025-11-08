import { Router } from "express";
import DocumentRoutes from "./DocumentRoutes";

const router = Router();

// Mount routes
router.use("/documents", DocumentRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Document Management API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
