import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
} from "react-router-dom";
import { PageLoading } from '@ant-design/pro-layout';

import App from './App'
import './index.less'
import routes from '@/routes';
import PermissionContext from './context/PermissionContext';
import { getUserPermission } from './services/user';

import type { RouteItem } from '@/routes';

const routeFilter = (routes: RouteItem[], permissionCodes: string[]) => {
  return routes.filter(route => {
    if (permissionCodes.includes(route.name)) {
      if (route.children) {
        route.children = routeFilter(route.children, permissionCodes)
      }
      return true
    } else {
      return false
    }
  })
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <PageLoading />
  </React.StrictMode>
)

const constPermissionCodes = [
  'Layout', 'Login', 'Page404',
]

let filterRoutes: RouteItem[] = []

const main = async () => {
  try {
    const res = await getUserPermission()
    // 路由过滤
    filterRoutes = routeFilter(routes.current, [
      ...res.data,
      ...constPermissionCodes,
    ])
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <PermissionContext.Provider value={{
            routes: filterRoutes
          }}>
            <App />
          </PermissionContext.Provider>
        </BrowserRouter>
      </React.StrictMode>
    )
  } catch (error) {
    
  }
}
main()
