import { useQuery } from "@tanstack/react-query";
import { productsService } from "@services/productService";
import { ProductListResponse, ProductQueryParams } from "@models/product";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export const useProducts = ({ category, sortBy }: ProductQueryParams) => {
  const navigation = useNavigation();

  const { data, isLoading, isError, refetch } = useQuery<ProductListResponse>({
    queryKey: ["products", category, sortBy],
    queryFn: () => productsService.fetchAll({ category, sortBy }),
  });

  const handleProductPress = useCallback((productId: number) => {
    navigation.navigate("ProductDetail", { productId });
  }, []);

  return {
    products: data?.products || [],
    loadingProducts: isLoading,
    refetchProducts: refetch,
    isError,
    handleProductPress,
  };
};
