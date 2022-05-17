# vite-react-demo

一个使用`vite`、`react-router v6`、`react-redux`的小demo，支持简易的路由权限（路由过滤）

## 开始

安装依赖

```bash
yarn
```

启动开发服务器

```bash
yarn run dev
```

## 配置
-----------------

### 路由配置

路由文件在`src\routes\index.tsx`，系统路由和侧边栏菜单根据路由文件自动生成

比如：

```js
export const LayoutRoute: RouteItem = {
  path: "/",
  element: 'LAYOUT',
  name: 'Layout',
  title: 'Layout',
  children: [
    {
      path: '/home',
      element: '@/pages/Home/index',
      title: '首页',
      name: 'Home',
      icon: 'HomeFilled',
    },
    {
      path: '/system',
      title: '系统',
      name: 'System',
      icon: 'SettingFilled',
      redirect: '/system/userManager',
      children: [
        {
          index: true,
          path: '/system/userManager',
          element: '@/pages/System/UserManager/index',
          title: '用户设置',
          name: 'UserManager',
        },
        {
          path: '/system/roleManager',
          element: '@/pages/System/RoleManager/index',
          title: '角色设置',
          name: 'RoleManager',
        },
      ],
    },
  ],
}
```

#### path

路由路径，推荐都使用绝对路径
<br/>

#### element

- 组件路径，目前只支持使用@别名，如果需要支持其他路径，例如相对路径，请自行适配，相关逻辑在`src\App.tsx`，使用了Vite的Glob 导入，在渲染路由的时候，使用React.lazy包裹成懒加载组件，
- 如果`element === 'LAYOUT'`，表示的是主布局组件，`src\Layout\index.tsx`

### 权限
- 在`src\App.tsx`中进行路由过滤，请求权限code的时候会展示一个loading