import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";
import { Home } from "@/pages/Layout/Home";
import { Article } from "@/pages/Layout/Article";
import { Publish } from "@/pages/Layout/Publish";

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
    children: [
      {
        // 设为默认路由
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
