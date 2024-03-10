import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/ProductController.js";

const router = Router();

router.get("/", getAllProducts).get("/:id", getProductById);

export default router;
