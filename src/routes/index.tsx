// import React from 'react';
// import {
//   SettingFilled,
//   HomeFilled,
// } from '@ant-design/icons';
// import { Outlet } from 'react-router-dom';

// import Login from '@/pages/Login';
// import Home from '@/pages/Home';
// import UserManager from '@/pages/System/UserManager';
// import RoleManager from '@/pages/System/RoleManager';
// import Page404 from '@/pages/Page404';
import {
  PAGE_NOT_FOUND_NAME,
  PAGE_NOT_FOUND_TITLE,
  // Layout,
} from './constant';

import type { RouteObject } from "react-router-dom";
// import type { ReactNode } from 'react';

export interface RouteItem extends RouteObject {
  title?: string;
  name: string;
  element?: string
  icon?: string
  children?: RouteItem[];
  redirect?: string;
  hideInMenu?: boolean;
}

export const LoginRoute: RouteItem = {
  element: '@/pages/Login/index',
  path: "/login",
  title: '登录',
  name: 'Login',
}
export const RootRoute: RouteItem = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  title: 'Root',
};
export const Page404Route: RouteItem = {
  path: "/",
  element: 'LAYOUT',
  name: PAGE_NOT_FOUND_NAME,
  title: PAGE_NOT_FOUND_TITLE,
  children: [
    {
      path: '*',
      element: '@/pages/Page404/index',
      name: PAGE_NOT_FOUND_NAME,
      title: PAGE_NOT_FOUND_TITLE,
      hideInMenu: true,
    }
  ]
}
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

export const basicRoutes: RouteItem[] = [
  LoginRoute,
  RootRoute,
  Page404Route,
];

export const dynamicRoutes: RouteItem[] = [
  LayoutRoute,
];

export const routes: RouteItem[] = [
  ...basicRoutes,
  ...dynamicRoutes,
];