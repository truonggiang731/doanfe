import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useAddHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'addHopDong'],
    queryFn: () => apiCall("add_adminhopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}