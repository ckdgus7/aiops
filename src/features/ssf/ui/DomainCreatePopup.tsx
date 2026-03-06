import { useState } from "react";
import { DomainFormPopup } from "@/features/ssf/ui/DomainFormPopup";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import type { DomainFormData } from "@/features/ssf/ui/DomainFormPopup";

interface DomainCreatePopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: DomainFormData) => void;
}

export function DomainCreatePopup({
  open,
  onClose,
  onSave,
}: DomainCreatePopupProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const handleSave = (data: DomainFormData) => {
    onSave?.(data);
    setSnackbarOpen(true);
  };

  return (
    <>
      <DomainFormPopup
        open={open}
        onClose={onClose}
        onSave={handleSave}
        mode="create"
      />
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="저장 되었습니다."
        type="success"
      />
    </>
  );
}

export type { DomainFormData };
