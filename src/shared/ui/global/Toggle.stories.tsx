import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Global/Toggle",
  component: Toggle,
  argTypes: {
    size: { control: "radio", options: ["l", "m", "s"] },
    label: { control: "text" },
    labelPosition: { control: "radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    checked: false,
    label: "토글",
    size: "m",
    disabled: false,
    labelPosition: "right",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const LabelLeft: Story = {
  args: { labelPosition: "left", label: "왼쪽 라벨" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "비활성" },
};

export const DisabledOn: Story = {
  args: { disabled: true, checked: true, label: "비활성 ON" },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={setChecked} label="클릭하여 토글" />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [values, setValues] = useState({ l: true, m: false, s: true });
    return (
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Toggle size="l" checked={values.l} onChange={(v) => setValues((p) => ({ ...p, l: v }))} label="Large" />
        <Toggle size="m" checked={values.m} onChange={(v) => setValues((p) => ({ ...p, m: v }))} label="Medium" />
        <Toggle size="s" checked={values.s} onChange={(v) => setValues((p) => ({ ...p, s: v }))} label="Small" />
      </div>
    );
  },
};
