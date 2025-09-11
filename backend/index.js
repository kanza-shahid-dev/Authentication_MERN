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

console.log("__dirname", __dirname);

app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`server is running at ${PORT}`);
});
