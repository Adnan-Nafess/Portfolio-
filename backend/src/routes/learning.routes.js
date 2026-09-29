import express from "express";

import {
  getLearning,
  createLearning,
  updateLearning,
  deleteLearning,
} from "../controllers/learning.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getLearning);

router.post("/", protect, adminOnly, createLearning);
router.patch("/:id", protect, adminOnly, updateLearning);
router.delete("/:id", protect, adminOnly, deleteLearning);

export default router;
