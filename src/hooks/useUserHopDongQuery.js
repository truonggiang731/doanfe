import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useUserHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'userhopdong'],
    queryFn: () => apiCall("user_hopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}
