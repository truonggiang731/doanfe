import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'hopdong'],
    queryFn: () => apiCall("get_all_hopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}