import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";

const useProductsQuery = ()=>{
    return useQuery({
        queryKey : ['products'],
        queryFn : getProducts
    })
}
export default useProductsQuery;