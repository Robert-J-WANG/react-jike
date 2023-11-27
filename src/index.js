import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.scss";
import router from "@/router/index";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // redux的store实例注入到组件
  <Provider store={store}>
    {/* router实例注入到组件 */}
    <RouterProvider router={router} />
  </Provider>
);
