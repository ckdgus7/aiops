import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Global/Button",
  component: Button,
  argTypes: {
    size: { control: "radio", options: ["l", "m", "s"] },
    variant: { control: "radio", options: ["filled", "outlined", "text"] },
    color: { control: "radio", options: ["positive", "negative", "warning", "success", "info"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "버튼",
    size: "l",
    variant: "filled",
    color: "positive",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FilledPositive: Story = {};

export const OutlinedInfo: Story = {
  args: { variant: "outlined", color: "info" },
};

export const FilledNegative: Story = {
  args: { variant: "filled", color: "negative", children: "삭제" },
};

export const FilledSuccess: Story = {
  args: { variant: "filled", color: "success", children: "승인" },
};

export const FilledWarning: Story = {
  args: { variant: "filled", color: "warning", children: "주의" },
};

export const TextVariant: Story = {
  args: { variant: "text", color: "positive", children: "텍스트" },
};

export const SizeMedium: Story = {
  args: { size: "m", children: "중간" },
};

export const SizeSmall: Story = {
  args: { size: "s", children: "작은" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Button size="l" variant="filled" color="positive">Filled</Button>
        <Button size="l" variant="outlined" color="positive">Outlined</Button>
        <Button size="l" variant="text" color="positive">Text</Button>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Button size="l" variant="filled" color="positive">Positive</Button>
        <Button size="l" variant="filled" color="negative">Negative</Button>
        <Button size="l" variant="filled" color="warning">Warning</Button>
        <Button size="l" variant="filled" color="success">Success</Button>
        <Button size="l" variant="filled" color="info">Info</Button>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Button size="l" variant="filled" color="positive">Large</Button>
        <Button size="m" variant="filled" color="positive">Medium</Button>
        <Button size="s" variant="filled" color="positive">Small</Button>
      </div>
    </div>
  ),
};
