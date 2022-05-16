import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GithubFilled } from '@ant-design/icons';

import styles from './index.module.less';
import RouteContext from '@/context/RouteContext';
import PermissionContext from '@/context/PermissionContext';
import { LayoutRoute } from '@/routes';

import type { MenuProps } from 'antd';
import type { RouteItem } from '@/routes';

const { Header, Content, Sider } = Layout;

function getMenuItem(routes: RouteItem[]): MenuProps['items'] {
  
  return routes.filter(route => !route.hideInMenu).map(route => {
    return {
      key: route.name as string,
      icon: route.icon,
      label: route.title,
      children: route.children ? getMenuItem(route.children) : undefined,
    }
  })
}

const getPathname = (routeName: string, routes: RouteItem[]): RouteItem | null => {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    if (route.name === routeName) {
      return route
    } else {
      if (route.children) {
        const tmp = getPathname(routeName, route.children)
        if (tmp) {
          return getPathname(routeName, route.children)
        }
      }
    }
  }
  return null
}

const BasicLayout: React.FC = (props) => {

  const { routes } = useContext(PermissionContext)
  const menuItems = useMemo(() => {
    return getMenuItem(LayoutRoute.children as RouteItem[])
  }, [routes])
  const matchRoute = useContext(RouteContext)
  const breadcrumbRoutes = useMemo(() => {
    return matchRoute.slice(1, matchRoute.length)
  }, [matchRoute])
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()

  useEffect(() => {
    if (matchRoute.length >= 1) {
      const realRoute = matchRoute[matchRoute.length - 1]
      setSelectedKeys([realRoute.name])
      const openKeys: string[] = []
      matchRoute.forEach(route => {
        if (realRoute.path?.startsWith(route.path as string)) {
          openKeys.push(route.name)
        }
      })
      setOpenKeys(openKeys)
    }
  }, [matchRoute])

  return (
    <Layout style={{ height: '100vh', width: '100%' }}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <GithubFilled
            style={{
              color: '#FFF',
              fontSize: 32
            }}
          />
          <span style={{ marginLeft: 15 }}>vite-react-demo</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClick={info => {
              const route = getPathname(info.key, routes)
              navigate({
                pathname: route?.path
              })
            }}
            onOpenChange={openKeys => {
              setOpenKeys(openKeys)
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {
              breadcrumbRoutes.map(route => (
                <Breadcrumb.Item
                  key={route.name}
                >
                  <Link to={route.path as string}>{route.title}</Link>
                </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};

export default BasicLayout
