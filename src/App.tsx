import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { pathToRegexp } from 'path-to-regexp';

import RouteContext from '@/context/RouteContext';
import PermissionContext from '@/context/PermissionContext';
import { PAGE_NOT_FOUND_NAME, PAGE_NOT_FOUND_TITLE } from '@/routes/constant';

import type { RouteItem } from '@/routes';

const renderRoute = (routes: RouteItem[]) => {
  return routes.map(item => {
    return (
      <Route
        path={item.path}
        element={
          item.element
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
  console.log(location);
  const navigate = useNavigate()
  const [currentRoute, setCurrentRoute] = useState<RouteItem[]>([])
  const { routes } = useContext(PermissionContext)
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
  }, [location.pathname, routes])
  return <Fragment>
    <RouteContext.Provider value={currentRoute} >
      <Routes>
        {
          renderRoute(routes)
        }
      </Routes>
    </RouteContext.Provider>
  </Fragment>
}

export default App