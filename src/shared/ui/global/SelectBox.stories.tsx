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

const projectOptions = [
  { label: "TC-CT-001 통신사 고객 서비스 개선", value: "tc-ct-001" },
  { label: "TC-CT-002 네트워크 품질 모니터링", value: "tc-ct-002" },
  { label: "TC-CT-003 데이터 분석 플랫폼 구축", value: "tc-ct-003" },
  { label: "TC-CT-004 고객 문의 응대 시스템 개선", value: "tc-ct-004" },
  { label: "TC-CT-005 보안 인프라 강화 프로젝트", value: "tc-ct-005" },
  { label: "TC-CT-006 클라우드 마이그레이션", value: "tc-ct-006" },
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
      <div style={{ width: 480, minHeight: 400 }}>
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
    const [val, setVal] = useState<string[]>(["tc-ct-001"]);
    return (
      <SelectBox
        value={val}
        onChange={setVal}
        options={projectOptions}
        multiple
        searchable
        searchHighlight
        label="과제 선택"
        required
        placeholder="과제를 검색하세요"
      />
    );
  },
};

export const MultiSelectWithSelectAll: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([]);
    return (
      <SelectBox
        value={val}
        onChange={setVal}
        options={sampleOptions}
        multiple
        selectAllLabel="전체 선택"
        label="전체 선택 가능"
        placeholder="선택하세요"
      />
    );
  },
};

export const MultiSelectMaxSelections: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([]);
    return (
      <SelectBox
        value={val}
        onChange={setVal}
        options={sampleOptions}
        multiple
        maxSelections={3}
        label="최대 3개 선택"
        placeholder="최대 3개까지 선택 가능"
      />
    );
  },
};
