import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiptapEditor } from "./TiptapEditor";

const meta: Meta<typeof TiptapEditor> = {
  title: "Service/TiptapEditor",
  component: TiptapEditor,
  decorators: [
    (Story) => (
      <div style={{ width: 800, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TiptapEditor>;

export const Empty: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <TiptapEditor value={val} onChange={setVal} placeholder="내용을 입력하세요" />;
  },
};

export const WithContent: Story = {
  render: () => {
    const [val, setVal] = useState("<p>안녕하세요. <strong>리치 텍스트 에디터</strong>입니다.</p><ul><li>항목 1</li><li>항목 2</li></ul>");
    return <TiptapEditor value={val} onChange={setVal} />;
  },
};

export const CustomHeight: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <TiptapEditor value={val} onChange={setVal} placeholder="높이가 300px인 에디터" minHeight={300} />;
  },
};
