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

export type NoticeSortKey = "no" | "category" | "title" | "author" | "createdAt" | "updatedAt" | "attachments" | "views";
export type NoticeSortDir = "asc" | "desc" | null;
