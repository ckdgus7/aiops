import type { RouteObject } from 'react-router';
import { lazy } from 'react';
import { LayoutRoute } from '@/shared/ui/LayoutRoute';

const NoticeListPage = lazy(() =>
  import('@/pages/notices/NoticeListPage').then(m => ({ default: m.default })),
);

export const routes: RouteObject[] = [
  {
    element: <LayoutRoute />,
    children: [
      { path: '/', element: <NoticeListPage /> },
      { path: '/notices', element: <NoticeListPage /> },
    ],
  },
];
