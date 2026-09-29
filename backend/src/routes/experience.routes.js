import express from "express";

import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getExperiences);

router.post("/", protect, adminOnly, createExperience);
router.patch("/:id", protect, adminOnly, updateExperience);
router.delete("/:id", protect, adminOnly, deleteExperience);

export default router;
