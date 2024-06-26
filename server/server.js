import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongo from "./config/mongo.js";
import products from "./data/products.js";
import productRouter from "./routes/ProductRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
mongo();

app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is on");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  if (id < 1 || id > 7 || isNaN(id)) {
    res.status(401).json({ message: "Product not found" });
  } else {
    const product = products.find((item) => item._id === id);
    res.status(200).json(product);
  }
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is on and listens at port: ${PORT}`),
);
