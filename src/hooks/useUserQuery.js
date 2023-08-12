import { apiCall } from "apis";
import {useQuery} from "react-query";

export default function useUserQuery() {
  const query = useQuery({
    queryKey: ['admin', 'user'],
    queryFn: () => apiCall("get_user"),
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}