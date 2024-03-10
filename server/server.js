import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import products from "./data/products.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is on");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  if (id < 1 || id > 7 || isNaN(id)) {
    res.status(401).json({ message: "Product not found" });
  } else {
    const product = products.find((item) => item._id === id);
    res.status(200).json(product);
  }
});

app.listen(PORT, () =>
  console.log(`Server is on and listens at port: ${PORT}`),
);
