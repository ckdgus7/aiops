import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Global/DatePicker",
  component: DatePicker,
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    value: "",
    placeholder: "YYYY-MM-DD",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <DatePicker value={val} onChange={setVal} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <DatePicker value={val} onChange={setVal} label="시작일" />;
  },
};

export const Required: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <DatePicker value={val} onChange={setVal} label="등록일" required />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState("2026-03-06");
    return <DatePicker value={val} onChange={setVal} label="선택된 날짜" />;
  },
};

export const ErrorState: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <DatePicker value={val} onChange={setVal} label="마감일" error helperText="날짜를 선택하세요." />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <DatePicker value="2026-01-01" onChange={() => {}} label="비활성" disabled />;
  },
};
