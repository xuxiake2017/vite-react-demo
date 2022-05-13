import React from 'react';

import type { RouteItem } from '@/routes';

const RouteContext = React.createContext<RouteItem[]>([]);

export default RouteContext;