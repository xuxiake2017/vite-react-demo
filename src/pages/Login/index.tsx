import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login, getUserPermission } from '@/services/user';
import { setPermissionCodes } from '@/store/permission'

import type { RootState, AppDispatch } from '@/store'
import type { LoginParams } from '@/services/user/model';

const loginHandler = async (params: LoginParams): Promise<boolean> => {
  const hide = message.loading('登录中', 0)
  try {
    const res = await login(params)
    localStorage.setItem('TOKEN', res.data.token)
    hide()
    message.success('登录成功')
    return true
  } catch (error) {
    hide()
    message.error('登录失败')
    return false
  }
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F0F2F5',
      }}
    >
      <Form<LoginParams>
        name="basic"
        initialValues={{ remember: true }}
        onFinish={async values => {
          const res = await loginHandler(values)
          if (res) {
            const userPermissionRes = await getUserPermission()
            dispatch(setPermissionCodes(userPermissionRes.data))
            navigate({
              pathname: '/home'
            })
          }
        }}
        autoComplete="off"
        layout="vertical"
        size="large"
        style={{
          width: '328px',
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;