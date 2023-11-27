// 封装高阶组件
// 核心逻辑：有token，正常跳转，无token，去登录页

import { getToken } from "@/utils";
import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const token = getToken();
  // 有token
  if (token) {
    return <>{children}</>;
  } else {
    // 没有token
    // 重定向到登录页，并进行替换
    return <Navigate to="/login" replace />;
  }
};
