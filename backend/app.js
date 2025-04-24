import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import sendEmail from "./utils/sendEmail.js";
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser()); // FIXED: add ()
app.use(express.json()); // FIXED: must include this

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/v1/users", userRoutes);
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail("lsagsnvk@gmail.com", "Test", "<p>It works!</p>");
    res.send("Sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed");
  }
});

export { app };
