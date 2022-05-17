import { MockHandler } from 'vite-plugin-mock-server'

import type { Connect } from 'vite';
import type { ServerResponse } from 'http';

const authentication = (req: Connect.IncomingMessage, res: ServerResponse) => {
  const token = req.headers.token
  if (!token) {
    res.statusCode = 403
  } else {
    res.statusCode = 200
  }
}

export default (): MockHandler[] => [
  {
    pattern: '/api/user/permission',
    method: 'GET',
    handle: (req, res) => {
      authentication(req, res)
      const data = {
        code: 200,
        data: [
          'Layout',
          'Home',
          'System',
          'UserManager',
          'RoleManager',
        ],
        message: '请求成功',
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 500)
    }
  },
  {
    pattern: '/api/user/login',
    method: 'POST',
    handle: (req, res) => {
      const data = {
        code: 200,
        data: {
          token: '46a9857c-d5a9-11ec-9d64-0242ac120002'
        },
        message: '请求成功',
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 500)
    }
  },
  {
    pattern: '/api/user/getUserInfo',
    method: 'GET',
    handle: (req, res) => {
      authentication(req, res)
      const data = {
        code: 200,
        data: {
          avatar: 'https://joeschmoe.io/api/v1/random',
          realName: 'Admin',
        },
        message: '请求成功',
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 500)
    }
  },
  {
    pattern: '/api/user/logout',
    method: 'GET',
    handle: (req, res) => {
      authentication(req, res)
      const data = {
        code: 200,
        data: {},
        message: '请求成功',
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 500)
    }
  },

  {
    pattern: '/api/demo/test1',
    method: 'GET',
    handle: (req, res) => {
      authentication(req, res)
      const data = {
        code: 200,
        data: 1,
        message: '请求成功',
      }
      setTimeout(() => {
        res.end(JSON.stringify(data))
      }, 500)
    }
  },
]