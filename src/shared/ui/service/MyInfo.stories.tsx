import type { Meta, StoryObj } from "@storybook/react";
import { MyInfo } from "./MyInfo";

const meta: Meta<typeof MyInfo> = {
  title: "Service/MyInfo",
  component: MyInfo,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MyInfo>;

const mockUserInfo = {
  employeeId: "P12345678",
  name: "김선경",
  company: "SK텔레콤",
  department: "BSS Architect팀",
  email: "skkim@sktelecom.com",
  phone: "010-1234-5678",
};

const mockRoleGroups = [
  {
    id: "1",
    level: "L3" as const,
    name: "L3 기획 리더",
    status: "신청" as const,
    appliedAt: "2025-12-19 10:45",
  },
  {
    id: "2",
    level: "L3" as const,
    name: "L3 Application 설계 리더",
  },
  {
    id: "3",
    level: "L4" as const,
    name: "L4 Application 설계 리더",
    status: "승인" as const,
    appliedAt: "2025-12-19 10:45",
    approvedAt: "2025-12-19 17:21",
  },
];

export const Default: Story = {
  args: {
    open: true,
    userInfo: mockUserInfo,
    roleGroups: mockRoleGroups,
    lastLogin: "2025-11-28 15:24",
    language: "en",
    onClose: () => {},
    onLanguageChange: () => {},
    onLanguageSave: () => {},
    onRoleGroupRequest: () => {},
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
};
