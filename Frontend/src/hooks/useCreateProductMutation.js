import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/productService";

const useCreateProductMutation = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export default useCreateProductMutation;
