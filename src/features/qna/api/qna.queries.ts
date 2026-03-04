import { useQuery } from "@tanstack/react-query";
import { getQnAList, getQnADetail, type QnAQueryParams } from "@/features/qna/model/mock-data";

export function useQnAListQuery(params: QnAQueryParams) {
  return useQuery({
    queryKey: ["qna-list", params],
    queryFn: () => Promise.resolve(getQnAList(params)),
  });
}

export function useQnADetailQuery(id: number) {
  return useQuery({
    queryKey: ["qna-detail", id],
    queryFn: () => Promise.resolve(getQnADetail(id)),
    enabled: id > 0,
  });
}
