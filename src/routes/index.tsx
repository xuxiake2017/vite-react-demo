import React from 'react';
import {
  SettingFilled,
  HomeFilled,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import UserManager from '@/pages/System/UserManager';
import RoleManager from '@/pages/System/RoleManager';
import Page404 from '@/pages/Page404';

import type { RouteObject } from "react-router-dom";
import type { ReactNode } from 'react';

export interface RouteItem extends RouteObject {
  title?: string;
  name: string;
  icon?: ReactNode
  children?: RouteItem[];
  redirect?: string;
  hideInMenu?: boolean;
}

const Layout = React.lazy(() => import('@/Layout'))

export const routes: RouteItem[] = [
  {
    element: <Login />,
    path: "/login",
    title: '登录',
    name: 'Login',
  },
  {
    path: "/",
    element: <Layout />,
    name: 'Layout',
    redirect: '/Home',
    title: '首页',
    children: [
      {
        path: '/Home',
        element: <Home />,
        title: '首页',
        name: 'Home',
        icon: <HomeFilled />,
      },
      {
        path: '/system',
        element: <Outlet />,
        title: '系统',
        name: 'System',
        icon: <SettingFilled />,
        redirect: '/system/userManager',
        children: [
          {
            index: true,
            path: '/system/userManager',
            element: <UserManager />,
            title: '用户设置',
            name: 'UserManager',
          },
          {
            path: '/system/roleManager',
            element: <RoleManager />,
            title: '角色设置',
            name: 'RoleManager',
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
        title: '404 Not Found',
        name: 'Page404',
        hideInMenu: true,
      },
    ],
  },
];

const routesRef = {
  current: routes
}

export default routesRef