export interface DomainItem {
  no: number;
  abbr: string;
  nameKo: string;
  nameEn: string;
  description: string;
  useYn: string;
}

export type SortKey = keyof DomainItem;
export type SortDir = "asc" | "desc" | null;
