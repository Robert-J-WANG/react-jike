import React, { useEffect } from "react";
import * as echarts from "echarts";

export const Home = () => {
  // useEffect钩子保证页面初次加载就能渲染dom
  useEffect(() => {
    // 保证dom可用，才能进行图标渲染

    // 1. 获取显然图标的dom节点
    const chartDom = document.getElementById("main");

    // 2. 图标初始化，生成图标实例对象
    const myChart = echarts.init(chartDom);

    // 3. 准备图标参数
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    // 4. 使用图标参数完成图标的渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      {/* 准备用于绑定图标渲染的dom节点,必须有宽和高 */}
      <div id="main" style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};
