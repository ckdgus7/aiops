export interface Requirement {
  id: string;
  reqId: string;
  title: string;
  status: "작성 중" | "검토 중" | "반려" | "승인" | "완료";
  dueDate: string;
  taskId: string;
  taskName: string;
  updatedAt: string;
  author: string;
  authorRole: string;
  authorOrg: string;
}
