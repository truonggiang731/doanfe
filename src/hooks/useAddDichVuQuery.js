import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useAddDichVuQuery() {
  const query = useQuery({
    queryKey: ['admin', 'addDichVu'],
    queryFn: () => apiCall("add_dichvu"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}
