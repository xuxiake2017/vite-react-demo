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
import {
  PAGE_NOT_FOUND_NAME,
  PAGE_NOT_FOUND_TITLE,
  Layout,
} from './constant';

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



export const LoginRoute: RouteItem = {
  element: <Login />,
  path: "/login",
  title: '登录',
  name: 'Login',
}
export const RootRoute: RouteItem = {
  path: '/',
  name: 'Root',
  redirect: '/Home',
  title: 'Root',
};
export const Page404Route: RouteItem = {
  path: "/",
  element: <Layout />,
  name: PAGE_NOT_FOUND_NAME,
  title: PAGE_NOT_FOUND_TITLE,
  children: [
    {
      path: '*',
      element: <Page404 />,
      name: PAGE_NOT_FOUND_NAME,
      title: PAGE_NOT_FOUND_TITLE,
      hideInMenu: true,
    }
  ]
}
export const LayoutRoute: RouteItem = {
  path: "/",
  element: <Layout />,
  name: 'Layout',
  title: 'Layout',
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
  ],
}

export const routes: RouteItem[] = [
  LoginRoute,
  RootRoute,
  LayoutRoute,
  Page404Route,
];

const routesRef = {
  current: routes
}

export default routesRef