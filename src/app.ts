import express from "express";
import cors from "cors";
import classifyRoute from "./routes/classify.route";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", classifyRoute);

export default app;