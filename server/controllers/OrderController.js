import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";

/**
 * @description   Create a new order
 * @route         POST /api/orders
 * @access        Private
 */
export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      taxPrice,
      shippingPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @description   Get logged in user orders
 * @route         GET /api/orders/myorders
 * @access        Private
 */
export const getMyOrders = expressAsyncHandler(async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id });

  if (!myOrders) {
    res.status(400);
    throw new Error("No orders for logged user");
  } else {
    res.status(200).json(myOrders);
  }
});

/**
 * @description   Get order by ID
 * @route         GET /api/orders/:id
 * @access        Private
 */
export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    res.status(404);
    throw new Error("No order for given ID.");
  } else {
    res.status(200).json(order);
  }
});

/**
 * @description   Update order to paid
 * @route         PUT /api/orders/:id/pay
 * @access        Private
 */
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "Order is paid." });
});

/**
 * @description   Update order to delivered
 * @route         PUT /api/orders/:id/delivered
 * @access        Private / Admin
 */
export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "Order is delivered." });
});

/**
 * @description   Get all orders
 * @route         GET /api/orders/all
 * @access        Private / Admin
 */
export const getAllOrders = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "All orders" });
});
