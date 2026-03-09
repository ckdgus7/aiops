import type { Meta, StoryObj } from "@storybook/react";
import { MyNotification } from "./MyNotification";

const meta: Meta<typeof MyNotification> = {
  title: "Service/MyNotification",
  component: MyNotification,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MyNotification>;

const mockNotifications = [
  {
    id: "1",
    content: "[{요구사항}] 요구사항의 유사도 검증결과가 도출되었습니다. 아래 요구사항 Detail 링크를 방문하셔서 유사도 검증결과를 확인해주세요.",
    linkText: "요구사항 Detail",
    time: "15분 전",
    highlighted: false,
  },
  {
    id: "2",
    content: "[{요구사항}] 요구사항이 신규로 등록되었습니다. 아래 요구사항 검토자 배정 링크를 방문하셔서 요구사항 검토자(L2) 배정을 완료해 주세요.",
    linkText: "요구사항 검토자 배정 Detail",
    time: "1시간 전",
    highlighted: true,
  },
  {
    id: "3",
    content: "[{요구사항}] 요구사항이 수정되었습니다. 아래 요구사항 검토자 배정 링크를 방문하셔서 변경된 내용을 확인하시고 요구사항 검토자(L2) 배정을 검토해 주세요.",
    linkText: "요구사항 검토자 배정 Detail",
    time: "3시간 전",
  },
  {
    id: "4",
    content: "[{요구사항}] 요구사항이 수정되었습니다. 아래 요구사항 검토자 배정 링크를 방문하셔서 변경된 내용을 확인하시고 요구사항 수용 여부 및 요구 상세를 검토해 주세요.",
    linkText: "요구사항 검토 Detail",
    time: "3시간 전",
  },
  {
    id: "5",
    content: "[{요구사항}] 요구사항의 검토자로 지정되었습니다. 아래 링크를 방문하셔서 요구사항을 검토 후 수용 또는 제외해주세요.",
    linkText: "요구사항 검토 Detail",
    time: "3시간 전",
  },
];

export const Default: Story = {
  args: {
    open: true,
    notifications: mockNotifications,
    totalCount: 30,
    loadedCount: 10,
    onClose: () => {},
    onMore: () => {},
    onLinkClick: () => {},
  },
};

export const AllLoaded: Story = {
  args: {
    ...Default.args,
    totalCount: 5,
    loadedCount: 5,
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
};
