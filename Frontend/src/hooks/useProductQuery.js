import { useQuery } from "@tanstack/react-query"
import { getProducById } from "../services/productService"

const usePtoductQuery = (id)=>{
    return useQuery({
        queryKey : ['product', id],
        queryFn : ()=>getProducById(id),
        enabled : !!id,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    })
}
export default usePtoductQuery