import express from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSkills);

router.post("/", protect, adminOnly, createSkill);
router.patch("/:id", protect, adminOnly, updateSkill);
router.delete("/:id", protect, adminOnly, deleteSkill);

export default router;
