import { useQuery } from "@tanstack/react-query";
import { getQnAList, type QnAQueryParams } from "@/features/qna/model/mock-data";

export function useQnAListQuery(params: QnAQueryParams) {
  return useQuery({
    queryKey: ["qna-list", params],
    queryFn: () => Promise.resolve(getQnAList(params)),
  });
}
