export interface QnAListParams {
  category: string;
  keyword: string;
  author: string;
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
}

export interface QnAItem {
  no: number;
  category: string;
  title: string;
  hasReply: boolean;
  author: string;
  createdAt: string;
  status: "답변완료" | "답변대기";
}

export type QnASortKey = "no" | "category" | "title" | "author" | "createdAt" | "status";
export type QnASortDir = "asc" | "desc" | null;

export interface QnAListResult {
  items: QnAItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
