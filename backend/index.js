import connectdb from "./config/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({});
const port = process.env.PORT;
connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
