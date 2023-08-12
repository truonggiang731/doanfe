import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useCanHoQuery() {
  const query = useQuery({
    queryKey: ['admin', 'canho'],
    queryFn: () => apiCall("get_all_canho"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}