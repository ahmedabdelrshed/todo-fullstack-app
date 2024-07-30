import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";
interface IUseAuthenticatedQuery {
    queryKey: string[]
    url: string
    config?: AxiosRequestConfig
}
// Custom query ook
const useAuthenticatedQuery = ({ queryKey, url, config }: IUseAuthenticatedQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance.get(url, config);
            return data;
        },
    })
}

export default useAuthenticatedQuery