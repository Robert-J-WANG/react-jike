import { request } from "@/utils";
import { useEffect } from "react";

const Layout = () => {
  // 测试token是否注入成功
  useEffect(() => {
    request.get("/user/profile");
  }, []);
  return <div>this is layout</div>;
};
export default Layout;
