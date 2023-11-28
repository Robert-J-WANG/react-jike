import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";

// 富文本编辑器的包和样式
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createArticleApi, getChannelApi } from "@/apis/articleApi";

const { Option } = Select;

const Publish = () => {
  /* ---------------------1. channel列表功能 -------------------- */
  // 1. 根据接口文档，在APIs模块中封装接口函数：
  // apis->article.js->getChannels
  // 2. 使用useState维护数据
  // 3. 使用useEffect，调用接口函数获取数据并存入state
  // 4. 绑定数据到下拉框组件
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

  /* ---------------------- 2.发布文章功能 ---------------------- */
  // 1. 使用form组件收集表单数据 onFinsh方法
  // 2. 按照接口文档封装接口函数：apis->channelApi->createArticleApi
  // 3. 按照接口文档处理表单数据
  // 4. 提交接口并验证是否成功
  // 收集表单数据的回调
  const onFinish = (formValues) => {
    console.log(formValues);
    const { title, content, channel_id } = formValues;
    // 处理表单数据
    const data = {
      title,
      content,
      cover: {
        type: 0,
        image: [],
      },
      channel_id,
    };
    // 提交数据到接口
    createArticleApi(data);
  };
  /* --------------------- 3. 发布封面图片功能 -------------------- */
  // 1. 为 Upload 组件添加 `action 属性`，配置封面图片上传接口地址
  // 2. 为 Upload组件添加 `name属性`, 接口要求的字段名
  // 3. 为 Upload 添加 `onChange 属性`，在事件中拿到当前图片数据，并存储到React状态中
  // 保存上传完成图片的数据
  const [imageList, setImageList] = useState([]);
  // 上传图片的回调
  const onChange = (value) => {
    console.log(value);
    setImageList(value.fileList);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          // 收集表单数据的方法
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* // 4. 绑定数据到下拉框组件 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* 封面图片区域 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType：控制选择文件框的外观样式
            showUploadList：控制显示上传列表
             */}
            <Upload
              listType="picture-card"
              showUploadList
              action={"http://geek.itheima.net/v1_0/upload"}
              name="image"
              onChange={onChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
