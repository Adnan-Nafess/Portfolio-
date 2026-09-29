import express from "express";

import { login, getMe } from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { loginLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Login
|--------------------------------------------------------------------------
| Protected by strict rate limiting.
|
*/

router.post("/login", loginLimiter, login);

/*
|--------------------------------------------------------------------------
| Current Admin
|--------------------------------------------------------------------------
*/

router.get("/me", protect, getMe);

export default router;
