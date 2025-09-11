import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./db/dbConfig.js";
import authRoutes from "./routes/auth.routes.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

// after your API routes
const path = require("path");
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
);

app.listen(PORT, () => {
  connectToDB();
  console.log(`server is running at ${PORT}`);
});
