import rateLimit from "express-rate-limit";

/*
|--------------------------------------------------------------------------
| General API Rate Limiter
|--------------------------------------------------------------------------
| Protects the API from excessive requests.
|
| 300 requests / 15 minutes / IP
|
*/

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 300,

  standardHeaders: "draft-7",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

/*
|--------------------------------------------------------------------------
| Login Rate Limiter
|--------------------------------------------------------------------------
| Login needs stricter protection because it is a
| common target for brute-force attacks.
|
| 10 attempts / 15 minutes / IP
|
*/

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 10,

  standardHeaders: "draft-7",

  legacyHeaders: false,

  skipSuccessfulRequests: true,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again later.",
    });
  },
});

/*
|--------------------------------------------------------------------------
| Contact Form Rate Limiter
|--------------------------------------------------------------------------
| Prevents someone from abusing the public contact form
| and filling the database with spam messages.
|
| 5 messages / 15 minutes / IP
|
*/

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: "draft-7",

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many messages. Please try again later.",
    });
  },
});

export { apiLimiter, loginLimiter, contactLimiter };
