import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';
import { RequestArgs as FirstFactorRequestArgs } from '../../types/first-factor.types';

const FirstFactorLogin = () => {
  const app = useAuthStore();
  const onFinish = async (values: FirstFactorRequestArgs) => {
    await app.postFirstFactor(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name={"username"}
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>;
};

export default FirstFactorLogin;
