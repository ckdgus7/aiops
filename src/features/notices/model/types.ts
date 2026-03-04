export type NoticeCategory = "공지" | "일반";

export interface Notice {
  no: number;
  category: NoticeCategory;
  title: string;
  isPinned: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  attachments: number;
  views: number;
}

export interface NoticeAttachment {
  id: string;
  name: string;
  size: string;
  downloads: number;
  uploadedAt: string;
}

export interface NoticeDetail {
  no: number;
  category: NoticeCategory;
  isPinned: boolean;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  attachments: NoticeAttachment[];
}

export type NoticeSortKey = "no" | "category" | "title" | "author" | "createdAt" | "updatedAt" | "attachments" | "views";
export type NoticeSortDir = "asc" | "desc" | null;
