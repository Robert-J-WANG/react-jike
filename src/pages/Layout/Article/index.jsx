import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
// 日期选择器的汉化包
import locale from "antd/es/date-picker/locale/zh_CN";

// 导入表格区资源
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { getArticleListApi } from "@/apis/articleApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  /* --------------------- 定义审核状态的数据对象 -------------------- */
  const status = {
    0: <Tag color="gray">草稿</Tag>,
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
    3: <Tag color="danger">审核失败</Tag>,
  };
  /* ----------------------- 准备表格区数据 ---------------------- */
  // 准备表格列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      /* --------------------- 3. 适配文章审核状态 -------------------- */
      // 1. 实现效果:根据文章的不同状态在状态列显示不同Tag
      // 2. 实现思路：
      // (1). 如果要适配的状态只有俩个 - 三元条件渲染
      // (2). 如果要适配的状态有多个 - 枚举渲染
      title: "状态",
      dataIndex: "status",
      // data就是从后端接口返回的状态数据
      // 文章状态: 0-草稿, 1-待审核, 2-审核通过, 3-审核失败, 不传为全部(指的参数名也不携带)
      // <Tag color="green">审核通过</Tag>
      // render: (data) => console.log(data),

      render: (data) =>
        // 1. 使用三元条件渲染(状态只有俩个)
        /* 
        data === 1 ? (
        <Tag color="warning">待审核</Tag>
        ) : (
        <Tag color="success">审核通过</Tag>
        )
        */
        // 2. 枚举渲染(状态有多个)
        status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  // 准备表格body数据
  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ];

  /* ---------------------- 1. 获取频道列表 --------------------- */
  // 1. 使用自定义钩子，获取channelList
  // 2. 渲染channelList数据到组件
  const { channelList } = useChannel();

  /* ------------------- 2. 获取文章列表，渲染表格 ------------------- */
  // 1. 封装获取文章列表的api:apis->articleApi->getArticleListApi
  // 2. 状态数据保存返回的文章列表结果->useState
  // 3. 定义副作用函数，调用接口，获取数据
  // 4. 保存数据到状态
  // 5. 使用数据渲染到页面
  const [articleList, setArticleList] = useState([]);
  // 存储文章总数
  const [articleCount, setArticleCount] = useState(0);
  useEffect(() => {
    const fetchList = async () => {
      const res = await getArticleListApi();
      setArticleList(res.data.results);
      setArticleCount(res.data.total_count);
    };
    fetchList();
  }, []);
  /* --------------------- 3. 适配文章审核状态 -------------------- */
  // 1. 实现效果:根据文章的不同状态在状态列显示不同Tag
  // 2. 实现思路：
  // (1). 如果要适配的状态只有俩个 - 三元条件渲染
  // (2). 如果要适配的状态有多个 - 枚举渲染
  return (
    <div>
      {/* 筛选区结构 */}
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 265 }}>
              {/* // 2. 渲染channelList数据到组件 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区结构 */}
      <Card title={`根据筛选条件共查询到 count 条结果：${articleCount}`}>
        {/* // 5. 使用数据渲染到页面 */}
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  );
};

export default Article;
