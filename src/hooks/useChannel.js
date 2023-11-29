import { useEffect, useState } from "react";
import { getChannelApi } from "@/apis/articleApi";

const useChannel = () => {
  /* ---------------- 1.  获取channel list的逻辑 --------------- */
  // 1. 根据接口文档，在APIs模块中封装接口函数：
  // apis->article.js->getChannels
  // 2. 使用useState维护数据
  // 3. 使用useEffect，调用接口函数获取数据并存入state
  // 4. 暴露出去useChannel，解构出数据，绑定数据到下拉框组件
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    // 定义异步方法来调用接口
    const fetchChannels = async () => {
      const res = await getChannelApi();
      setChannelList(res.data.channels);
    };
    // 调用一步方法
    fetchChannels();
  }, []);
  /* ------------------- 2. 返回组件中需要用到的数据 ------------------ */
  return { channelList };
};
export { useChannel };
