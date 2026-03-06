import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from "./SelectBox";

const sampleOptions = [
  { label: "서비스 이용문의", value: "service" },
  { label: "기술 지원", value: "tech" },
  { label: "계정 관련", value: "account" },
  { label: "결제 관련", value: "payment" },
  { label: "기타", value: "etc" },
];

const meta: Meta<typeof SelectBox> = {
  title: "Global/SelectBox",
  component: SelectBox,
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    searchable: { control: "boolean" },
  },
  args: {
    options: sampleOptions,
    placeholder: "선택하세요",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} placeholder="선택하세요" />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} label="카테고리" placeholder="카테고리 선택" />;
  },
};

export const Required: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} label="유형" required placeholder="유형 선택" />;
  },
};

export const Searchable: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} searchable placeholder="검색하여 선택" />;
  },
};

export const ErrorState: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} label="필수 항목" error helperText="필수 항목입니다." />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <SelectBox value="" onChange={() => {}} options={sampleOptions} disabled placeholder="비활성" />;
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([]);
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} multiple label="복수 선택" placeholder="선택하세요" />;
  },
};

export const MultiSelectSearchable: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>(["service"]);
    return <SelectBox value={val} onChange={setVal} options={sampleOptions} multiple searchable label="검색 복수 선택" />;
  },
};
