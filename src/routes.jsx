import React from 'react';

const Index = React.lazy(() => import('./pages/Index'));

const routes = [
    { path: "/", exact: true, component:Index },
]

export default routes;