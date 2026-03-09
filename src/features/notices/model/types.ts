export type NoticeCategory = "공통" | "업무" | "서비스";

export interface Notice {
  no: number;
  category: NoticeCategory;
  title: string;
  isNew: boolean;
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
  isNew: boolean;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  attachments: NoticeAttachment[];
}

export type NoticeSortKey = "no" | "category" | "title" | "author" | "createdAt" | "views";
export type NoticeSortDir = "asc" | "desc" | null;
