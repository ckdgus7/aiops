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

export interface ComponentItem {
  no: number;
  componentId: string;
  nameKo: string;
  nameEn: string;
  description: string;
  domainNameKo: string;
  planLeader: string;
  designLeader: string;
  useYn: string;
}

export type ComponentSortKey = keyof ComponentItem;
