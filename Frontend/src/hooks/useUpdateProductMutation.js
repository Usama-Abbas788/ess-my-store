import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/productService";

const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateProduct(id, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });
    },
  });
};

export default useUpdateProductMutation;
