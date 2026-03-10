import { useQuery } from "@tanstack/react-query";
import { getComponentList, getComponentByName } from "@/features/ssf/model/mock-data";

export function useComponentListQuery() {
  return useQuery({
    queryKey: ["ssf-component-list"],
    queryFn: () => Promise.resolve(getComponentList()),
  });
}

export function useComponentByNameQuery(nameKo: string) {
  return useQuery({
    queryKey: ["ssf-component-by-name", nameKo],
    queryFn: () => Promise.resolve(getComponentByName(nameKo)),
    enabled: !!nameKo,
  });
}
