// 封装与频道相关的函数接口
import { request } from "@/utils";

// 获取频道列表的
export function getChannelApi() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 发布文章的
export function createArticleApi(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}
// 获取文章列表的
export function getArticleListApi(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}
