import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";
import { Button } from "./Button";

const meta: Meta<typeof Snackbar> = {
  title: "Global/Snackbar",
  component: Snackbar,
  argTypes: {
    type: { control: "radio", options: ["info", "positive", "negative", "error", "warning", "success"] },
    duration: { control: "number" },
  },
  args: {
    open: true,
    message: "스낵바 메시지입니다.",
    type: "info",
    duration: 3000,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Info: Story = {
  args: { type: "info", message: "정보 안내 메시지" },
};

export const Positive: Story = {
  args: { type: "positive", message: "저장이 완료되었습니다." },
};

export const Negative: Story = {
  args: { type: "negative", message: "삭제가 완료되었습니다." },
};

export const ErrorType: Story = {
  args: { type: "error", message: "오류가 발생했습니다." },
};

export const Warning: Story = {
  args: { type: "warning", message: "주의가 필요합니다." },
};

export const Success: Story = {
  args: { type: "success", message: "승인이 완료되었습니다." },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>스낵바 표시</Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="3초 후 자동으로 사라집니다."
          type="positive"
          duration={3000}
        />
      </div>
    );
  },
};

export const AllTypes: Story = {
  render: () => {
    const types = ["info", "positive", "negative", "error", "warning", "success"] as const;
    const [activeType, setActiveType] = useState<typeof types[number] | null>(null);
    return (
      <div style={{ padding: 40, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {types.map((t) => (
          <Button key={t} size="m" variant="outlined" color="info" onClick={() => setActiveType(t)}>
            {t}
          </Button>
        ))}
        {activeType && (
          <Snackbar
            open
            onClose={() => setActiveType(null)}
            message={`${activeType} 타입 스낵바입니다.`}
            type={activeType}
            duration={3000}
          />
        )}
      </div>
    );
  },
};
