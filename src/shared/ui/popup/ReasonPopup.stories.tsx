import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReasonPopup } from "./ReasonPopup";
import { Button } from "@/shared/ui/global/Button";

const meta: Meta<typeof ReasonPopup> = {
  title: "Popup/ReasonPopup",
  component: ReasonPopup,
  argTypes: {
    title: { control: "text" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
    placeholder: { control: "text" },
    label: { control: "text" },
    maxLength: { control: "number" },
  },
  args: {
    open: true,
    title: "반려",
    cancelLabel: "닫기",
    confirmLabel: "승인",
    maxLength: 300,
  },
};

export default meta;
type Story = StoryObj<typeof ReasonPopup>;

export const Reject: Story = {
  args: {
    title: "반려",
    confirmLabel: "반려",
  },
};

export const Approve: Story = {
  args: {
    title: "승인",
    confirmLabel: "승인",
  },
};

export const Delete: Story = {
  args: {
    title: "삭제",
    confirmLabel: "삭제",
    label: "삭제사유",
    placeholder: "삭제 사유를 입력해주세요.",
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="negative" onClick={() => setOpen(true)}>반려하기</Button>
        <ReasonPopup
          open={open}
          title="반려"
          onCancel={() => setOpen(false)}
          onConfirm={(reason) => {
            console.log("사유:", reason);
            setOpen(false);
          }}
          confirmLabel="반려"
        />
      </>
    );
  },
};
