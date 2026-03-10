import { useQuery } from "@tanstack/react-query";
import { getBusinessList, getBusinessDetail } from "@/features/ssf/model/mock-data";

export function useBusinessListQuery() {
  return useQuery({
    queryKey: ["ssf-business-list"],
    queryFn: () => Promise.resolve(getBusinessList()),
  });
}

export function useBusinessDetailQuery(businessId: string) {
  return useQuery({
    queryKey: ["ssf-business-detail", businessId],
    queryFn: () => Promise.resolve(getBusinessDetail(businessId)),
    enabled: !!businessId,
  });
}
