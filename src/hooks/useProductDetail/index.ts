import { useQuery } from "@tanstack/react-query";
import { productsService } from "@services/productService";

export const useProductDetail = (productId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => productsService.fetchById(productId),
    enabled: !!productId,
  });

  return {
    product: data,
    isLoading,
    isError,
  };
};
