import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Global/Input",
  component: Input,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    indicator: { control: "text" },
    prefix: { control: "radio", options: [undefined, "search"] },
  },
  args: {
    placeholder: "텍스트를 입력하세요",
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "이름", placeholder: "이름을 입력하세요" },
};

export const Required: Story = {
  args: { label: "이메일", required: true, placeholder: "이메일을 입력하세요" },
};

export const WithSearchPrefix: Story = {
  args: { prefix: "search", placeholder: "검색어를 입력하세요" },
};

export const WithIndicator: Story = {
  args: { label: "검색", indicator: "0/100" },
};

export const ErrorState: Story = {
  args: { label: "비밀번호", error: true, helperText: "비밀번호가 올바르지 않습니다." },
};

export const Disabled: Story = {
  args: { label: "비활성", disabled: true, placeholder: "입력 불가" },
};
