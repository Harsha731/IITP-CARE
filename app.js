import path from "path";
import { fileURLToPath } from "url";

// Derive __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import "./env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.js";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started on port:", port);
});
