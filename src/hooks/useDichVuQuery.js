import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useDichVuQuery() {
  const query = useQuery({
    queryKey: ['admin', 'dichvu'],
    queryFn: () => apiCall("get_all_dichvu"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}