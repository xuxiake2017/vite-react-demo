import { MockHandler } from 'vite-plugin-mock-server'

export default (): MockHandler[] => [
  {
    pattern: '/api/user/permission',
    method: 'GET',
    handle: (req, res) => {
      const data = {
        code: 200,
        data: [
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
]