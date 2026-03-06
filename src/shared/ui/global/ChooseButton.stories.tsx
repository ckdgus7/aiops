import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChooseButton } from "./ChooseButton";

const meta: Meta<typeof ChooseButton> = {
  title: "Global/ChooseButton",
  component: ChooseButton,
  args: {
    value: "list",
    options: [
      { label: "목록", value: "list" },
      { label: "카드", value: "card" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ChooseButton>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState("list");
    return (
      <ChooseButton
        value={val}
        onChange={setVal}
        options={[
          { label: "목록", value: "list" },
          { label: "카드", value: "card" },
        ]}
      />
    );
  },
};

export const ThreeOptions: Story = {
  render: () => {
    const [val, setVal] = useState("all");
    return (
      <ChooseButton
        value={val}
        onChange={setVal}
        options={[
          { label: "전체", value: "all" },
          { label: "사용", value: "use" },
          { label: "미사용", value: "unuse" },
        ]}
      />
    );
  },
};
