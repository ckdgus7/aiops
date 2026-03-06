import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TermsPopup } from "./TermsPopup";
import { Button } from "@/shared/ui/global/Button";

const meta: Meta<typeof TermsPopup> = {
  title: "Popup/TermsPopup",
  component: TermsPopup,
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof TermsPopup>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" color="info" onClick={() => setOpen(true)}>
          서비스 이용약관
        </Button>
        <TermsPopup open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};
