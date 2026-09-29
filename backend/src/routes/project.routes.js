import express from "express";

import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Admin
router.post("/", protect, adminOnly, createProject);
router.patch("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
