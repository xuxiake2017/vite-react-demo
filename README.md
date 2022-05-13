# vite-react-demo

一个使用`vite`、`react-router v6`的小demo，支持路由权限（路由过滤）

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

- 路由文件在`src\routes\index.tsx`，系统路由和侧边栏菜单根据路由文件自动生成
- 在`src\App.tsx`中进行路由过滤，请求权限code的时候会展示一个loading
- 项目主布局组件在`src\Layout\index.tsx`