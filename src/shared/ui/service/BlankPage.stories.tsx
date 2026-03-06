import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { BlankPage } from "./BlankPage";

const meta: Meta<typeof BlankPage> = {
  title: "Service/BlankPage",
  component: BlankPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: "100%", height: 400 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlankPage>;

export const Default: Story = {
  args: {
    title: "대시보드",
    gnbName: "메인",
    path: "/dashboard",
  },
};
