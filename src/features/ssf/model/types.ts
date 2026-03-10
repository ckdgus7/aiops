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

export interface BusinessItem {
  no: number;
  businessId: string;
  nameKo: string;
  nameEn: string;
  description: string;
  domainNameKo: string;
  componentNameKo: string;
  planLeader: string;
  designLeader: string;
  useYn: string;
}

export type BusinessSortKey = keyof BusinessItem;

export interface FunctionItem {
  no: number;
  functionId: string;
  nameKo: string;
  nameEn: string;
  functionType: "Composite" | "Orchestration";
  description: string;
  businessId: string;
  businessNameKo: string;
  componentNameKo: string;
  domainNameKo: string;
  planLeader: string;
  designLeader: string;
  useYn: string;
}

export type FunctionSortKey = keyof FunctionItem;
