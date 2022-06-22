import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { useAuthStore } from '../../stores/auth-store';
import { RequestArgs as SecondFactorRequestArgs } from '../../types/second-factor.types';

const SecondFactorLogin = () => {
  const app = useAuthStore();
  const onFinish = async (values: SecondFactorRequestArgs) => {
    await app.postSecondFactor(values);
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
      label="OTP"
      name={"otp"}
      rules={[{ required: true, message: 'Please input OTP!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>;
};

export default SecondFactorLogin;
