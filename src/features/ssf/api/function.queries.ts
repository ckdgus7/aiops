import { useQuery } from "@tanstack/react-query";
import { getFunctionList } from "@/features/ssf/model/mock-data";

export function useFunctionListQuery() {
  return useQuery({
    queryKey: ["ssf-function-list"],
    queryFn: () => Promise.resolve(getFunctionList()),
  });
}
