import { request } from "@/utils";

// 封装login的api函数
export function loginApi(loginData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: loginData,
  });
}

// 封装获取用户信息的api函数
export function getProfileApi() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
