import { useState } from "react";
import { DomainFormPopup } from "@/features/ssf/ui/DomainFormPopup";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import type { DomainFormData } from "@/features/ssf/ui/DomainFormPopup";
import type { DomainItem } from "@/features/ssf/model/types";

interface DomainEditPopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: DomainFormData) => void;
  onDelete?: () => void;
  initialData?: DomainItem | null;
}

export function DomainEditPopup({ open, onClose, onSave, onDelete, initialData }: DomainEditPopupProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
        onDelete={onDelete}
        mode="edit"
        initialData={initialData}
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
