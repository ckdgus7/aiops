import { useQuery } from "@tanstack/react-query";
import { getDomainList, getDomainDetail } from "@/features/ssf/model/mock-data";

export function useDomainListQuery() {
  return useQuery({
    queryKey: ["ssf-domain-list"],
    queryFn: () => Promise.resolve(getDomainList()),
  });
}

export function useDomainDetailQuery(nameKo: string) {
  return useQuery({
    queryKey: ["ssf-domain-detail", nameKo],
    queryFn: () => Promise.resolve(getDomainDetail(nameKo)),
    enabled: !!nameKo,
  });
}
