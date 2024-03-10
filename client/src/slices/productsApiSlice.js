import { PRODUCTS_URL } from "../config/const";
import apiSlice from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 10,
    }),
    getProductById: builder.query({
      query: (_id) => ({
        url: `${PRODUCTS_URL}/${_id}`,
      }),
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } =
  productsApiSlice;
