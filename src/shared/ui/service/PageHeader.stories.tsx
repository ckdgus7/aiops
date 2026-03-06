import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { PageHeader } from "./PageHeader";
import { usePageHeaderStore } from "@/shared/model/pageHeader.store";
import { useMdiStore } from "@/shared/model/mdi.store";

function PageHeaderSetup({ title, breadcrumbs, badge, idBadge }: {
  title: string;
  breadcrumbs: { label: string }[];
  badge?: string;
  idBadge?: string;
}) {
  const setPageHeader = usePageHeaderStore((s) => s.setPageHeader);
  const addTab = useMdiStore((s) => s.addTab);
  const setActiveTab = useMdiStore((s) => s.setActiveTab);

  useEffect(() => {
    setPageHeader({
      breadcrumbItems: breadcrumbs,
      title,
      favoriteKey: title,
      badge,
      idBadge,
    });
    addTab({ id: "current", label: title, path: "/" });
    setActiveTab("current");
  }, [setPageHeader, addTab, setActiveTab, title, breadcrumbs, badge, idBadge]);

  return <PageHeader />;
}

const meta: Meta<typeof PageHeader> = {
  title: "Service/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: "100%" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const NoticeList: Story = {
  render: () => (
    <PageHeaderSetup
      title="공지사항"
      breadcrumbs={[{ label: "게시판" }, { label: "공지사항" }]}
    />
  ),
};

export const WithBadge: Story = {
  render: () => (
    <PageHeaderSetup
      title="업무정보 상세"
      breadcrumbs={[{ label: "SSF관리" }, { label: "업무정보관리" }, { label: "상세" }]}
      badge="승인대기"
      idBadge="BZ-PTYTMFC001"
    />
  ),
};
