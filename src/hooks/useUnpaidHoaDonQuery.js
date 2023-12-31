import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useUnpaidHoaDonQuery() {
  const query = useQuery({
    queryKey: ['admin', 'unpaidhoadon'],
    queryFn: () => apiCall("unpaid_hoadon"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}