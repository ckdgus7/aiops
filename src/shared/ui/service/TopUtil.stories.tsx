import type { Meta, StoryObj } from "@storybook/react";
import { TopUtil } from "./TopUtil";

const meta: Meta<typeof TopUtil> = {
  title: "Service/TopUtil",
  component: TopUtil,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#fafafa", padding: 8, borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopUtil>;

export const Default: Story = {
  args: {},
};

export const WithNotifications: Story = {
  args: {
    bellNotification: true,
    chatNotification: true,
  },
};

export const BellOnly: Story = {
  args: {
    bellNotification: true,
    chatNotification: false,
  },
};
