import express from "express";
import cors from "cors";
import classifyRoute from "./routes/classify.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", classifyRoute);

export default app;