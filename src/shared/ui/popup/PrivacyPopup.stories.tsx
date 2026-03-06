import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PrivacyPopup } from "./PrivacyPopup";
import { Button } from "@/shared/ui/global/Button";

const meta: Meta<typeof PrivacyPopup> = {
  title: "Popup/PrivacyPopup",
  component: PrivacyPopup,
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof PrivacyPopup>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" color="info" onClick={() => setOpen(true)}>
          개인정보처리방침
        </Button>
        <PrivacyPopup open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};
