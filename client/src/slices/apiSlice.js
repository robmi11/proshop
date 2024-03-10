import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config/const";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
