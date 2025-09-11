import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./db/dbConfig.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`server is running at ${PORT}`);
});
