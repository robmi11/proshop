import expressAsyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

/**
 * @description Get All Products from database
 * @returns Array of available products
 */
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  } else {
    res.status(200).json(products);
  }
});

/**
 * @description Get Single Product
 * @param ProductId (mongo db ObjectId)
 * @returns Object of single product
 */
export const getProductById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});
