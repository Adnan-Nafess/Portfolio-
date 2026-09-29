import express from "express";
import cors from "cors";
import helmet from "helmet";

import { apiLimiter } from "./middleware/rateLimit.middleware.js";

import { notFound, errorHandler } from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import articleRoutes from "./routes/article.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import learningRoutes from "./routes/learning.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Security Headers
|--------------------------------------------------------------------------
*/

app.use(helmet());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  }),
);

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

/*
|--------------------------------------------------------------------------
| General API Rate Limiter
|--------------------------------------------------------------------------
*/

app.use("/api", apiLimiter);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/experience", experienceRoutes);

app.use("/api/learning", learningRoutes);

app.use("/api/messages", messageRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFound);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

export default app;
