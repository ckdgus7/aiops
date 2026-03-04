import type { RouteObject } from 'react-router';
import { lazy, Suspense } from 'react';
import { LayoutRoute } from '@/shared/ui/LayoutRoute';

const NoticeListPage = lazy(() =>
  import('@/pages/notices/NoticeListPage').then(m => ({ default: m.NoticeListPage })),
);

const RequirementsPage = lazy(() =>
  import('@/pages/requirements/RequirementsPage').then(m => ({ default: m.RequirementsPage })),
);
const RequirementsSpecPage = lazy(() =>
  import('@/pages/requirements/RequirementsSpecPage').then(m => ({ default: m.RequirementsSpecPage })),
);
const RequirementsReviewerPage = lazy(() =>
  import('@/pages/requirements/RequirementsReviewerPage').then(m => ({ default: m.RequirementsReviewerPage })),
);
const RequirementsReviewPage = lazy(() =>
  import('@/pages/requirements/RequirementsReviewPage').then(m => ({ default: m.RequirementsReviewPage })),
);
const RequirementsDetailPage = lazy(() =>
  import('@/pages/requirements/RequirementsDetailPage').then(m => ({ default: m.RequirementsDetailPage })),
);
const RequirementsApprovalPage = lazy(() =>
  import('@/pages/requirements/RequirementsApprovalPage').then(m => ({ default: m.RequirementsApprovalPage })),
);
const RequirementsRejectReviewPage = lazy(() =>
  import('@/pages/requirements/RequirementsRejectReviewPage').then(m => ({ default: m.RequirementsRejectReviewPage })),
);
const FlowDesignPage = lazy(() =>
  import('@/pages/requirements/FlowDesignPage').then(m => ({ default: m.FlowDesignPage })),
);
const AppDesignPage = lazy(() =>
  import('@/pages/requirements/AppDesignPage').then(m => ({ default: m.AppDesignPage })),
);

const SbPlanningPage = lazy(() =>
  import('@/pages/ui-management/SbPlanningPage').then(m => ({ default: m.SbPlanningPage })),
);
const UiDesignPage = lazy(() =>
  import('@/pages/ui-management/UiDesignPage').then(m => ({ default: m.UiDesignPage })),
);
const PublishingPage = lazy(() =>
  import('@/pages/ui-management/PublishingPage').then(m => ({ default: m.PublishingPage })),
);

const FeatureDesignPage = lazy(() =>
  import('@/pages/feature-management/FeatureDesignPage').then(m => ({ default: m.FeatureDesignPage })),
);
const DetailFeatureDesignPage = lazy(() =>
  import('@/pages/feature-management/DetailFeatureDesignPage').then(m => ({ default: m.DetailFeatureDesignPage })),
);

const QnaPage = lazy(() =>
  import('@/pages/qna/QnaPage').then(m => ({ default: m.QnaPage })),
);

const DomainPage = lazy(() =>
  import('@/pages/ssf/DomainPage').then(m => ({ default: m.DomainPage })),
);
const ComponentInfoPage = lazy(() =>
  import('@/pages/ssf/ComponentInfoPage').then(m => ({ default: m.ComponentInfoPage })),
);
const BusinessInfoPage = lazy(() =>
  import('@/pages/ssf/BusinessInfoPage').then(m => ({ default: m.BusinessInfoPage })),
);
const FunctionInfoPage = lazy(() =>
  import('@/pages/ssf/FunctionInfoPage').then(m => ({ default: m.FunctionInfoPage })),
);
const SsfExplorerPage = lazy(() =>
  import('@/pages/ssf/SsfExplorerPage').then(m => ({ default: m.SsfExplorerPage })),
);

const UsersPage = lazy(() =>
  import('@/pages/workspace/UsersPage').then(m => ({ default: m.UsersPage })),
);
const TermsPage = lazy(() =>
  import('@/pages/workspace/TermsPage').then(m => ({ default: m.TermsPage })),
);
const PrivacyPage = lazy(() =>
  import('@/pages/workspace/PrivacyPage').then(m => ({ default: m.PrivacyPage })),
);

const FlowManagementPage = lazy(() =>
  import('@/pages/business-info/FlowManagementPage').then(m => ({ default: m.FlowManagementPage })),
);
const ScreenInfoPage = lazy(() =>
  import('@/pages/business-info/ScreenInfoPage').then(m => ({ default: m.ScreenInfoPage })),
);
const ProgressPage = lazy(() =>
  import('@/pages/business-info/ProgressPage').then(m => ({ default: m.ProgressPage })),
);
const ProjectPage = lazy(() =>
  import('@/pages/business-info/ProjectPage').then(m => ({ default: m.ProjectPage })),
);

function LazyFallback() {
  return <div style={{ padding: 40, textAlign: 'center', color: '#a1a1aa' }}>Loading...</div>;
}

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<LazyFallback />}>
      <Component />
    </Suspense>
  );
}

export const routes: RouteObject[] = [
  {
    element: <LayoutRoute />,
    children: [
      { path: '/', element: withSuspense(RequirementsPage) },

      { path: '/requirements', element: withSuspense(RequirementsPage) },
      { path: '/requirements/spec', element: withSuspense(RequirementsSpecPage) },
      { path: '/requirements/reviewer', element: withSuspense(RequirementsReviewerPage) },
      { path: '/requirements/review', element: withSuspense(RequirementsReviewPage) },
      { path: '/requirements/detail', element: withSuspense(RequirementsDetailPage) },
      { path: '/requirements/approval', element: withSuspense(RequirementsApprovalPage) },
      { path: '/requirements/reject-review', element: withSuspense(RequirementsRejectReviewPage) },
      { path: '/requirements/flow-design', element: withSuspense(FlowDesignPage) },
      { path: '/requirements/app-design', element: withSuspense(AppDesignPage) },

      { path: '/ui/sb-planning', element: withSuspense(SbPlanningPage) },
      { path: '/ui/design', element: withSuspense(UiDesignPage) },
      { path: '/ui/publishing', element: withSuspense(PublishingPage) },

      { path: '/features/design', element: withSuspense(FeatureDesignPage) },
      { path: '/features/detail-design', element: withSuspense(DetailFeatureDesignPage) },

      { path: '/notices', element: withSuspense(NoticeListPage) },
      { path: '/qna', element: withSuspense(QnaPage) },

      { path: '/ssf/domain', element: withSuspense(DomainPage) },
      { path: '/ssf/component', element: withSuspense(ComponentInfoPage) },
      { path: '/ssf/business', element: withSuspense(BusinessInfoPage) },
      { path: '/ssf/function', element: withSuspense(FunctionInfoPage) },
      { path: '/ssf/explorer', element: withSuspense(SsfExplorerPage) },

      { path: '/workspace/users', element: withSuspense(UsersPage) },
      { path: '/workspace/terms', element: withSuspense(TermsPage) },
      { path: '/workspace/privacy', element: withSuspense(PrivacyPage) },

      { path: '/business-info/flow', element: withSuspense(FlowManagementPage) },
      { path: '/business-info/screen', element: withSuspense(ScreenInfoPage) },
      { path: '/business-info/progress', element: withSuspense(ProgressPage) },
      { path: '/business-info/project', element: withSuspense(ProjectPage) },
    ],
  },
];
