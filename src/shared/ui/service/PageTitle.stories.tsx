import type { Meta, StoryObj } from "@storybook/react";
import { PageTitle } from "./PageTitle";
import { Button } from "@/shared/ui/global/Button";

const meta: Meta<typeof PageTitle> = {
  title: "Service/PageTitle",
  component: PageTitle,
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: "#ffffff" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: "공지사항",
  },
};

export const WithBadge: Story = {
  args: {
    title: "업무정보 상세",
    badge: "승인대기",
  },
};

export const WithIdBadge: Story = {
  args: {
    title: "업무정보 상세",
    idBadge: "BZ-PTYTMFC001",
  },
};

export const WithBack: Story = {
  args: {
    title: "공지사항 상세",
    onBack: () => console.log("뒤로 가기"),
  },
};

export const WithFavorite: Story = {
  args: {
    title: "도메인관리",
    favoriteKey: "domain-mgmt",
  },
};

export const WithRefresh: Story = {
  args: {
    title: "컴포넌트관리",
    showRefresh: true,
    onRefresh: () => console.log("새로고침"),
  },
};

export const WithActions: Story = {
  args: {
    title: "공지사항",
    actions: (
      <Button size="m" variant="filled" color="positive">
        등록
      </Button>
    ),
  },
};

export const FullFeatured: Story = {
  args: {
    title: "업무정보 상세",
    idBadge: "BZ-PTYTMFC001",
    badge: "승인완료",
    favoriteKey: "biz-detail",
    showRefresh: true,
    onBack: () => console.log("뒤로"),
    onRefresh: () => console.log("새로고침"),
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="m" variant="outlined" color="info">취소</Button>
        <Button size="m" variant="filled" color="positive">저장</Button>
      </div>
    ),
  },
};
