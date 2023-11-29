import { getProfileApi, loginApi } from "@/apis/userApi";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

// 和用户相关的状态管理
const userStore = createSlice({
  name: "user",
  // 初始化状态
  initialState: {
    // 有本地存储有吗？
    token: getToken() || "",
    // 在redux中维护个人信息-因为多个组件中都会使用到个人信息
    userInfo: {},
  },
  reducers: {
    // 同步方法-更新token
    setToken(state, action) {
      state.token = action.payload;
      // 本地存储也保存一份
      _setToken(action.payload);
    },
    // 同步方法-更新userInfo
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    // 同步方法-清除用户信息
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      // 清除本地存储
      removeToken();
    },
  },
});

// 编写异步方法，提交表单数据，获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 使用封装的axios方法request
    const res = await loginApi(loginForm);
    console.log(res);
    // 调用同步方法，更新状态
    dispatch(setToken(res.data.token));
  };
};

// 编写异步方法，获取userInfo
const fetchUserInfo = () => {
  return async (dispatch) => {
    // 使用封装的axios方法request
    const res = await getProfileApi();
    // console.log(res);
    // 调用同步方法，更新状态
    dispatch(setUserInfo(res.data));
  };
};

// 解构出actionCreater方法
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;
export { fetchLogin, fetchUserInfo, clearUserInfo };
// 获取reducer函数，并导出
const userReducer = userStore.reducer;
export default userReducer;
