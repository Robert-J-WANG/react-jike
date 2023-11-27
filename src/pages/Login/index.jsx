import "./index.scss";
import { Card, Form, Input, Button } from "antd";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  // 提交表单的回调
  const onFinish = (values) => {
    console.log(values);
    // 触发异步方法，提交表单数据，是useDispatch钩子
    dispatch(fetchLogin(values));
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          // 表单失焦时验证
          validateTrigger="onBlur"
          // 提交表单时的回调
          onFinish={onFinish}
        >
          <Form.Item
            // 表单验证
            name="mobile"
            rules={[
              // 非空验证
              { required: true, message: "请输入手机号" },
              // 手机号位数验证
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            // 表单验证
            name="code"
            rules={[
              // 非空验证
              { required: true, message: "请输入验证码" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
