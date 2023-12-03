import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { AuthRoute } from "@/components/AuthRoute";
// import  Home  from "@/pages/Layout/Home";
// import Article from "@/pages/Layout/Article";
// import Publish from "@/pages/Layout/Publish";
import { Suspense, lazy } from "react";

/* ---------------------- 优化-路由懒加载 ---------------------- */
// 1.使用 lazy 方法导入路由组件
const Home = lazy(() => import("@/pages/Layout/Home"));
const Article = lazy(() => import("@/pages/Layout/Article"));
const Publish = lazy(() => import("@/pages/Layout/Publish"));
// 2. 使用内置的 Suspense 组件渲染路由组件
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
        element: (
          // 2. 使用内置的 Suspense 组件渲染路由组件
          <Suspense fallback={"加载中..."}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"加载中..."}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中..."}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
