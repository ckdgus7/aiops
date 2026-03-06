import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Global/Textarea",
  component: Textarea,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    indicator: { control: "boolean" },
    maxLength: { control: "number" },
  },
  args: {
    placeholder: "내용을 입력하세요",
    maxLength: 300,
    indicator: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "사유", placeholder: "사유를 입력하세요" },
};

export const Required: Story = {
  args: { label: "내용", required: true },
};

export const ErrorState: Story = {
  args: { label: "내용", error: true, helperText: "필수 입력 항목입니다." },
};

export const ReadOnly: Story = {
  args: { label: "읽기전용", readOnly: true, defaultValue: "이 내용은 수정할 수 없습니다." },
};

export const Disabled: Story = {
  args: { label: "비활성", disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <Textarea
        label="반려사유"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="사유를 입력하세요"
        maxLength={300}
        indicator
      />
    );
  },
};
