import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.scss";
import router from "@/router/index";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
