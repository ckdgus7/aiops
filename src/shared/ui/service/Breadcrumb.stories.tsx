import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Service/Breadcrumb",
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const TwoLevels: Story = {
  args: {
    items: [
      { label: "공지사항" },
      { label: "목록", onClick: () => console.log("목록 클릭") },
    ],
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: "SSF관리" },
      { label: "도메인관리" },
      { label: "상세", onClick: () => console.log("상세 클릭") },
    ],
  },
};

export const SingleLevel: Story = {
  args: {
    items: [{ label: "대시보드", onClick: () => console.log("대시보드 클릭") }],
  },
};
