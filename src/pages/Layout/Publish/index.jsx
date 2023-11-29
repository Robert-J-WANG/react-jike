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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";

// 富文本编辑器的包和样式
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createArticleApi, getArticlebyIdApi } from "@/apis/articleApi";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  /* ---------------------1. channel列表功能 -------------------- */
  // 使用自定义钩子，获取频道列表
  const { channelList } = useChannel();

  /* ---------------------- 2.发布文章功能 ---------------------- */
  // 1. 使用form组件收集表单数据 onFinsh方法
  // 2. 按照接口文档封装接口函数：apis->channelApi->createArticleApi
  // 3. 按照接口文档处理表单数据
  // 4. 提交接口并验证是否成功
  // 收集表单数据的回调
  const onFinish = (formValues) => {
    // console.log(formValues);
    const { title, content, channel_id } = formValues;
    // 优化：边界判断-上传图片的数量要和图片类型相符
    if (imageType !== imageList.length)
      return message.warning("图片数量不符合上传类型");
    // 处理表单数据
    const data = {
      title,
      content,
      cover: {
        type: imageType, // 上传图片的类型：0-无图，1-1图，3-3图
        image: imageList.map((item) => item.response.data.url), // 图片列表
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
  const onImageChange = (value) => {
    console.log(value);
    setImageList(value.fileList);
  };
  /* --------------------- 4.切换封面类型功能 --------------------- */
  // 1. 获取当前封面的类型:onChange方法
  // 2. 根据类型，对上传组件进行条件渲染
  // 保存当前封面类型数据
  const [imageType, setImageType] = useState(0); // 0是无图模式
  // 获取类型的回调
  const onTypeChange = (e) => {
    // console.log(e.target.value);
    setImageType(e.target.value);
  };
  /* -------------------- 5. 设置上传图片的数量功能 -------------------- */
  // 1. 找到限制上传数量的组件属性：maxCount
  // 2. 使用imageType进行绑定控制

  /* -------------------- 6.文章编辑-数据的回填功能 -------------------- */
  // 现象效果：跳转到编辑页面时，把页面中的字段完成数据的回显
  // 1. 通过文章id获取到文章详情数据（调用接口）
  // 获取文章id
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  console.log(articleId);
  // 获取到文章详情数据（调用接口）
  // 2. 调用Form组件实例方法setFieldsValue回显数据
  // 创建Form实例
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchArticle = async (articleId) => {
      const res = await getArticlebyIdApi(articleId);
      console.log(res);
      // 2. 调用Form组件实例方法setFieldsValue回显数据
      form.getFieldValue(res);
    };
    fetchArticle();
  }, [articleId, form]);
  // 2. 调用Form组件实例方法setFieldsValue回显数据

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
          // 设置默认图片模式为无图
          initialValues={{ type: 0 }}
          // 收集表单数据的方法
          onFinish={onFinish}
          form={form}
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
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* // 2. 根据类型，对上传组件进行条件渲染 */}
            {imageType > 0 && (
              /* 
              listType：控制选择文件框的外观样式
              showUploadList：控制显示上传列表 
              */
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onImageChange}
                // 1. 找到限制上传数量的组件属性：maxCount
                // 2. 使用imageType进行绑定控制
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
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
