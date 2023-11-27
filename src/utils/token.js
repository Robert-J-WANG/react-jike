// 封装和token相关的方法-存/取/删，方便多个组件中使用

const TOKEN_KEY = "token_key";

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export { setToken, getToken, removeToken };
