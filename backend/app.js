import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors);
app.use(cookieParser);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/v1/users", userRoutes);

export { app };
