require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const projectsRouter = require("./modules/projects/projects.route");
const skillsRouter = require("./modules/skills/skills.route");
const contactRouter = require("./modules/contact/contact.route");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://protfolio-naqw00jgq-eritau-leonard.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Trop de requêtes, réessaie dans 15 minutes." },
});
app.use(limiter);

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5,
  message: { error: "Trop d'envois. Réessaie dans 1 heure." },
});

// ─── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));

// ─── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running 🚀" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/contact", contactLimiter, contactRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur interne." });
});

app.listen(PORT, () => {
  console.log(`\n Portfolio API démarré sur http://localhost:${PORT}`);
  console.log(` Environnement : ${process.env.NODE_ENV || "development"}\n`);
});