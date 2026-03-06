import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { LNB } from "./LNB";

const meta: Meta<typeof LNB> = {
  title: "Service/LNB",
  component: LNB,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: "100vh", display: "flex" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LNB>;

export const Default: Story = {
  args: {
    activeGnb: "게시판",
    activeItem: "공지사항",
  },
};

export const SSFActive: Story = {
  args: {
    activeGnb: "SSF관리",
    activeItem: "도메인관리",
  },
};

export const RequirementsActive: Story = {
  args: {
    activeGnb: "기획",
    activeItem: "요구사항",
  },
};
