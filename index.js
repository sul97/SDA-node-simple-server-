import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: "You have reached maximum requests ,Please try again in a minute",
});

app.use(limiter);

app.use("/products", productRoutes);

app.use("/users",usersRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.post("/", (req, res) => {
  const data = req.body;
  console.log("Received Data :", data);
  res.send("<h1>Data received</h1>");
});

app.get("/home", (req, res) => {
  const filePath = path.resolve("./views/index.html");
  res.sendFile(filePath);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
