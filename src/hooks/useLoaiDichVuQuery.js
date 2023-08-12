import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useLoaiDichVuQuery() {
  const query = useQuery({
    queryKey: ['admin', 'loaidichvu'],
    queryFn: () => apiCall("get_loaidichvu"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}