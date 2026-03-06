import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Global/Checkbox",
  component: Checkbox,
  argTypes: {
    size: { control: "radio", options: ["l", "m", "s"] },
    label: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    checked: false,
    label: "체크박스",
    size: "m",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const WithLabel: Story = {
  args: { label: "약관에 동의합니다" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "비활성" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: "비활성 체크" },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox checked={checked} onChange={setChecked} label="클릭하여 토글" />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [values, setValues] = useState({ l: true, m: false, s: true });
    return (
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Checkbox size="l" checked={values.l} onChange={(v) => setValues((p) => ({ ...p, l: v }))} label="Large" />
        <Checkbox size="m" checked={values.m} onChange={(v) => setValues((p) => ({ ...p, m: v }))} label="Medium" />
        <Checkbox size="s" checked={values.s} onChange={(v) => setValues((p) => ({ ...p, s: v }))} label="Small" />
      </div>
    );
  },
};
