import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useToaNhaQuery() {
  const query = useQuery({
    queryKey: ['admin', 'toanha'],
    queryFn: () => apiCall("get_toanha"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}