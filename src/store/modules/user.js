import { createSlice } from "@reduxjs/toolkit";

// 和用户相关的状态管理
const userStore = createSlice({
  name: "user",
  // 初始化状态
  initialState: {
    token: "",
  },
  reducers: {
    // 同步方法
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 解构出actionCreater方法
const { setToken } = userStore.actions;
// 获取reducer函数，并导出
const userReducer = userStore.reducer;
export default userReducer;
