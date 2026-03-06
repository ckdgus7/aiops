import type { Meta, StoryObj } from "@storybook/react";
import { PageFooter } from "./PageFooter";

const meta: Meta<typeof PageFooter> = {
  title: "Service/PageFooter",
  component: PageFooter,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageFooter>;

export const Default: Story = {};
