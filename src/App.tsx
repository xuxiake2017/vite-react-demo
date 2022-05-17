import React, { Fragment, useContext, useEffect, useState, lazy, Suspense, useCallback, useMemo } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { pathToRegexp } from 'path-to-regexp';
import { useSelector, useDispatch } from 'react-redux'
import { PageLoading } from '@ant-design/pro-layout';

import RouteContext from '@/context/RouteContext';
import PermissionContext from '@/context/PermissionContext';
import { PAGE_NOT_FOUND_NAME, PAGE_NOT_FOUND_TITLE, Layout } from '@/routes/constant';
import { basicRoutes, dynamicRoutes, routes } from '@/routes';
import { getUserPermission, getUserInfo } from '@/services/user';
import { setPermissionCodes } from '@/store/permission'
import { setUserInfo } from '@/store/user'

import type { RouteItem } from '@/routes';
import type { RootState, AppDispatch } from '@/store'

const pages = import.meta.glob('@/pages/**/*.tsx')
const formatPages: Record<string, () => Promise<{ default: any }>> = {}
Object.entries(pages).forEach(entry => {
  const key = entry[0]
  const path = `@/${key.replace('.tsx', '').replace('./', '')}`
  formatPages[path] = entry[1] as (() => Promise<{ default: any }>)
})

const renderRoute = (routes: RouteItem[]) => {
  return routes.map(item => {
    let element: React.ReactNode | undefined = undefined
    if (item.element !== undefined) {
      if (item.element === 'LAYOUT') {
        element = <Layout />
      } else {
        if (formatPages[item.element] !== undefined) {
          const Component = lazy(formatPages[item.element])
          element = (
            <Suspense
              fallback={
                null
              }
            >
              <Component />
            </Suspense>
          )
        }
      }
    }
    return (
      <Route
        path={item.path}
        element={
          element
        }
        index={item.index}
        key={item.name}
      >
        {
          item.children && renderRoute(item.children)
        }
      </Route>
    )
  })
}

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

const getCurrentRoute = (pathname: string, routes: RouteItem[]): RouteItem[] => {
  let matchRoute: RouteItem[] = []
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    if (route.name === PAGE_NOT_FOUND_NAME) continue
    if (route.path) {
      const regexp = pathToRegexp(route.path);
      const res = regexp.exec(pathname)
      if (res) {
        matchRoute.push(route)
        return matchRoute
      } else {
        if (route.children) {
          const tmp = getCurrentRoute(pathname, route.children)
          if (tmp.length > 0) {
            matchRoute = [route, ...tmp]
            return matchRoute
          } 
        }
      }
    }
  }
  return matchRoute
}

const App: React.FC = (props) => {

  const location = useLocation()
  const navigate = useNavigate()
  const [currentRoute, setCurrentRoute] = useState<RouteItem[]>([])
  const permissionCodes = useSelector<RootState, string[]>(state => state.permission.permissionCodes)
  const routes_ = useMemo(() => {
    return routeFilter(JSON.parse(JSON.stringify(dynamicRoutes)), permissionCodes)
  }, [permissionCodes])
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const currentRoute = getCurrentRoute(location.pathname, routes)
    setCurrentRoute(currentRoute)
    if (currentRoute.length > 0) {
      const realRoute = currentRoute[currentRoute.length - 1]
      if (realRoute.redirect) {
        navigate({
          pathname: realRoute.redirect,
        }, {
          replace: true
        })
      }
      document.title = realRoute.title as string
    } else {
      document.title = PAGE_NOT_FOUND_TITLE
    }
  }, [location.pathname])

  const init = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getUserPermission()
      dispatch(setPermissionCodes(res.data))
      const userInfoRes = await getUserInfo()
      dispatch(setUserInfo(userInfoRes.data))
      setLoading(false)
    } catch (error) {
      navigate({
        pathname: '/login'
      })
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    init()
  }, [])

  return <Fragment>
    <RouteContext.Provider value={currentRoute} >
      <PermissionContext.Provider value={{
        routes: routes_
      }}>
        {
          loading ? (
            <PageLoading />
          ) : (
            <Routes>
              {
                renderRoute(basicRoutes)
              }
              {
                renderRoute(routes_)
              }
            </Routes>
          )
        }
      </PermissionContext.Provider>
    </RouteContext.Provider>
  </Fragment>
}

export default App