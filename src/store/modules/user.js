import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

// 和用户相关的状态管理
const userStore = createSlice({
  name: "user",
  // 初始化状态
  initialState: {
    // 有本地存储有吗？
    token: localStorage.getItem("token_key") || "",
  },
  reducers: {
    // 同步方法
    setToken(state, action) {
      state.token = action.payload;
      // 本地存储也保存一份
      localStorage.setItem("token_key", action.payload);
    },
  },
});

// 编写异步方法，提交表单数据
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 使用封装的axios方法request
    const res = await request.post("/authorizations", loginForm);
    console.log(res);
    // 调用同步方法，更新状态
    dispatch(setToken(res.data.token));
  };
};

// 解构出actionCreater方法
const { setToken } = userStore.actions;
export { setToken, fetchLogin };
// 获取reducer函数，并导出
const userReducer = userStore.reducer;
export default userReducer;
