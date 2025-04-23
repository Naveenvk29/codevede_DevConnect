import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors);
app.use(cookieParser);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

export { app };
