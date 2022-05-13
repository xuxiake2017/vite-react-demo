import React from 'react';

import routesRef from '@/routes';

import type { RouteItem } from '@/routes';

const PermissionContext = React.createContext<{
  routes: RouteItem[],
}>({
  routes: routesRef.current,
});

export default PermissionContext;