// 封装获取频道列表的函数接口
import { request } from "@/utils";

export function getChannelApi() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

export function createArticleApi(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}
