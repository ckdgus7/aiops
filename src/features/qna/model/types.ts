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

export interface QnAComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface QnAAttachment {
  id: string;
  name: string;
  downloads: number;
  size: string;
  uploadedAt: string;
}

export interface QnADetail {
  id: number;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  views: number;
  status: "답변완료" | "답변대기";
  content: string;
  attachments: QnAAttachment[];
  comments: QnAComment[];
}
