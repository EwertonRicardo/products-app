import { useQuery } from "@tanstack/react-query";
import { Category } from "@models/category";
import { productsService } from "@services/productService";

export const useCategories = () => {
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: productsService.fetchCategories,
  });

  return {
    categories: data || [],
    loadingCategories: isLoading,
    isError,
  };
};
