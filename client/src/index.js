// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./bootstrap.custom.css";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <>
        <h3>404 - page not found...</h3>
        <LinkContainer to="/">
          <Link>Back</Link>
        </LinkContainer>
      </>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/product/:_id",
        element: <ProductDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
