import type { QnAListParams } from "@/features/qna/model/types";

export function parseQnASearchParams(searchParams: URLSearchParams): QnAListParams {
  const category = searchParams.get("category") ?? "";
  const keyword = searchParams.get("keyword") ?? "";
  const author = searchParams.get("author") ?? "";
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.max(1, Number(searchParams.get("pageSize") ?? "10"));

  return { category, keyword, author, startDate, endDate, page, pageSize };
}
