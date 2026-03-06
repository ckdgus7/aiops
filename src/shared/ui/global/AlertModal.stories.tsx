import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertModal } from "./AlertModal";
import { Button } from "./Button";

const meta: Meta<typeof AlertModal> = {
  title: "Global/AlertModal",
  component: AlertModal,
  argTypes: {
    type: { control: "radio", options: ["info", "success", "warning", "error"] },
    showCancel: { control: "boolean" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
  },
  args: {
    open: true,
    message: "알림 메시지입니다.",
    type: "info",
    showCancel: false,
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Info: Story = {
  args: { type: "info", message: "정보를 확인해 주세요." },
};

export const Success: Story = {
  args: { type: "success", message: "저장이 완료되었습니다." },
};

export const Warning: Story = {
  args: { type: "warning", message: "변경 사항이 저장되지 않았습니다." },
};

export const Error: Story = {
  args: { type: "error", message: "오류가 발생했습니다. 다시 시도해 주세요." },
};

export const WithCancel: Story = {
  args: {
    type: "warning",
    message: "정말 삭제하시겠습니까?",
    showCancel: true,
    confirmLabel: "삭제",
    cancelLabel: "취소",
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>알림 열기</Button>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          type="info"
          message="인터랙티브 알림입니다."
        />
      </>
    );
  },
};

export const DeleteConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="negative" onClick={() => setOpen(true)}>삭제</Button>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          type="error"
          message="선택한 항목을 삭제하시겠습니까?"
          showCancel
          confirmLabel="삭제"
          cancelLabel="취소"
          onConfirm={() => console.log("삭제됨")}
        />
      </>
    );
  },
};
