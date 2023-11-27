import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

// 组合redux子模块+导出store实例对象;
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
