import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useAddCanHoQuery() {
  const query = useQuery({
    queryKey: ['admin', 'canho'],
    queryFn: () => apiCall("add_canho"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}
