import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Global/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

function FileUploadControlled(props: Partial<React.ComponentProps<typeof FileUpload>>) {
  const [files, setFiles] = useState<{ id: string; name: string }[]>(
    props.value ?? [],
  );
  return <FileUpload {...props} value={files} onChange={setFiles} />;
}

export const Default: Story = {
  render: () => <FileUploadControlled />,
};

export const WithFiles: Story = {
  render: () => (
    <FileUploadControlled
      value={[
        { id: "1", name: "Nova_AI_DevOps_01.pdf" },
        { id: "2", name: "설계문서_v2.5.xlsx" },
        { id: "3", name: "회의록_20260301.docx" },
      ]}
    />
  ),
};

export const CustomText: Story = {
  render: () => (
    <FileUploadControlled
      dragText="이미지를 드래그하거나 클릭하여 업로드하세요."
      buttonText="이미지 선택"
      accept="image/*"
    />
  ),
};

export const SingleFile: Story = {
  render: () => (
    <FileUploadControlled
      multiple={false}
      dragText="파일을 선택하세요. (1개만 업로드 가능)"
    />
  ),
};
