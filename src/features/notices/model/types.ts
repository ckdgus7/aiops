export interface Notice {
  id: number;
  title: string;
  createdAt: string;
  views: number;
}

export interface NoticeDetail extends Notice {
  content: string;
}

export interface NoticeQuery {
  title: string;
  fromDate: string | null;
  toDate: string | null;
}

export interface NoticeListParams {
  title?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

export interface NoticeListResponse {
  items: Notice[];
  total: number;
  page: number;
  totalPages: number;
}
