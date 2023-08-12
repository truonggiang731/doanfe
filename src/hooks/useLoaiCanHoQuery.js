import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useLoaiCanHoQuery() {
  const query = useQuery({
    queryKey: ['admin', 'loaicanho'],
    queryFn: () => apiCall("get_loaicanho"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}