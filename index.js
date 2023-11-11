import express from "express";
import morgan from "morgan";
import "dotenv/config";

import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.post("/", (req, res) => {
  const data = req.body;
  console.log("Received Data :", data);
  res.send("<h1>Data received</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
