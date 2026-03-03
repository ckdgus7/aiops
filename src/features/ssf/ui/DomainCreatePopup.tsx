import { DomainFormPopup } from "@/features/ssf/ui/DomainFormPopup";
import type { DomainFormData } from "@/features/ssf/ui/DomainFormPopup";

interface DomainCreatePopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: DomainFormData) => void;
}

export function DomainCreatePopup({ open, onClose, onSave }: DomainCreatePopupProps) {
  return (
    <DomainFormPopup
      open={open}
      onClose={onClose}
      onSave={onSave}
      mode="create"
    />
  );
}

export type { DomainFormData };
