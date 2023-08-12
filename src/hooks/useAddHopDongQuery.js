import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useAddHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'hopdong'],
    queryFn: () => apiCall("add_hopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}