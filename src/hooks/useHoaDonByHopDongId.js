import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useHoaDonByHopDongQuery() {
  const query = useQuery({
    queryKey: ['admin', 'hoadon_hopdong'],
    queryFn: () => apiCall("hoadon_hopdong"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}