import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";

// 配置路由
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // 使用封装的高阶组件来进行有无token的判断跳转
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
