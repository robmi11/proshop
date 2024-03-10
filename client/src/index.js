// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";

import "./bootstrap.custom.css";
import "./index.css";

import { LinkContainer } from "react-router-bootstrap";
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
