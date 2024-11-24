import { config } from "dotenv";
config();

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import { connectDb } from "./config/database.js";

const app = express();

const PORT = process.env.PORT ?? 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Content-Security-Policy-Report-Only", "default-src: https:");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
    return res.status(200).json({});
  }

  next();
});

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "It is working",
  });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use((_req, _res, next) => {
  const error = new Error("Endpoint could not find!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, _next) => {
  res.status(error.status || 500);
  return res.json({
    message: error.message ?? "Server Error",
    success: false,
  });
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
