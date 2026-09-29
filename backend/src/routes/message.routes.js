import express from "express";

import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

import { contactLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Contact Form
|--------------------------------------------------------------------------
*/

router.post("/", contactLimiter, createMessage);

/*
|--------------------------------------------------------------------------
| Admin Message Management
|--------------------------------------------------------------------------
*/

router.get("/", protect, adminOnly, getMessages);

router.patch("/:id", protect, adminOnly, updateMessage);

router.delete("/:id", protect, adminOnly, deleteMessage);

export default router;
