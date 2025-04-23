import connectdb from "./config/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({});

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("server was running succssfully ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
