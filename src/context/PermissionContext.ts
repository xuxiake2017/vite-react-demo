import React from 'react';

import type { RouteItem } from '@/routes';

const PermissionContext = React.createContext<{
  routes: RouteItem[],
}>({
  routes: [],
});

export default PermissionContext;