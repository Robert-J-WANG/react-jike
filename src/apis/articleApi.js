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

// 删除文章的
export function delArticleApi(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "DELETE",
  });
}

// 获取文章详情的
export function getArticlebyIdApi(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "GET",
  });
}
