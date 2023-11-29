import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, fetchUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  /* ---------------------- 点击菜单跳转路由 ---------------------- */
  const navigate = useNavigate();
  const onClickMenu = (route) => {
    // console.log(route);
    navigate(route.key);
  };
  /* -------------------- 选中组件内容，反向高亮菜单 ------------------- */
  // 1. 获取当前的pathname:使用useLocation()钩子
  // 2. 把pathname绑定到对应的控制高亮的属性上
  const location = useLocation();
  const selectedKey = location.pathname;

  /* ------------ 页面初次渲染，触发fetchUserInfo的action ----------- */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  // 获取useInfo状态，并渲染到页面
  const { name } = useSelector((state) => state.user.userInfo);
  // console.log(name);

  /* ----------------------- 退出登录功能： ---------------------- */
  // 1. 清除用户信息
  // 2. 跳转到登录页面
  // 确认退出登录的回调
  const onConfirm = () => {
    // 1. 清除用户信息
    dispatch(clearUserInfo());
    // 2. 跳转到登录页面
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/* 渲染用户信息到页面 */}
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // 2. 把pathname绑定到对应的控制高亮的属性上
            selectedKeys={selectedKey}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={onClickMenu}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
