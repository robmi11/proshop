import { Router } from "express";
import {
  addOrderItems,
  updateOrderToPaid,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
} from "../controllers/OrderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/delivered", protect, admin, updateOrderToDelivered);

export default router;
