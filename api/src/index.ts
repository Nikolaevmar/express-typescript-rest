require('dotenv').config();

import express from "express"; 
import cors from "cors";
import { routes } from "./routes";
import cookieParser from "cookie-parser";

const mongoose = require("mongoose");

start();

async function start() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/nodetsreact`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("Database connection error!");
    process.exit(1);
  }
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({credentials: true, origin: ["http://localhost:3000"] }));
  app.listen(8000, () => console.log("Listening to port 8000"));
  routes(app);
}