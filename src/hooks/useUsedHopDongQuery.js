import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useUsedHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'usedhopdong'],
    queryFn: () => apiCall("used_hopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}
