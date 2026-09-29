import express from "express";

import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

router.post("/", protect, adminOnly, createArticle);
router.patch("/:id", protect, adminOnly, updateArticle);
router.delete("/:id", protect, adminOnly, deleteArticle);

export default router;
