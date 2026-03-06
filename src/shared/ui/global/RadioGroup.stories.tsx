import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const sampleOptions = [
  { label: "옵션 A", value: "a" },
  { label: "옵션 B", value: "b" },
  { label: "옵션 C", value: "c" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Global/RadioGroup",
  component: RadioGroup,
  argTypes: {
    size: { control: "radio", options: ["l", "m", "s"] },
    direction: { control: "radio", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
    gap: { control: "number" },
  },
  args: {
    value: "a",
    options: sampleOptions,
    size: "m",
    direction: "horizontal",
    disabled: false,
    gap: 16,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { direction: "vertical" },
};

export const SizeLarge: Story = {
  args: { size: "l" },
};

export const SizeSmall: Story = {
  args: { size: "s" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState("a");
    return <RadioGroup value={val} onChange={setVal} options={sampleOptions} />;
  },
};

export const WithDisabledOption: Story = {
  render: () => {
    const [val, setVal] = useState("a");
    return (
      <RadioGroup
        value={val}
        onChange={setVal}
        options={[
          { label: "활성", value: "a" },
          { label: "비활성", value: "b", disabled: true },
          { label: "활성", value: "c" },
        ]}
      />
    );
  },
};
