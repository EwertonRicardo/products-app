import { apiClient } from "@api/client";
import { Category } from "@models/category";
import {
  Product,
  ProductListResponse,
  ProductQueryParams,
} from "@models/product";

export const productsService = {
  async fetchAll({
    category = "",
    sortBy,
  }: ProductQueryParams): Promise<ProductListResponse> {
    const basePath = "/products";

    const url = category ? `${basePath}/category/${category}` : basePath;

    const { data } = await apiClient.get<ProductListResponse>(url, {
      params: { sortBy },
    });

    return data;
  },

  async fetchCategories(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>("/products/categories");
    return data;
  },

  async fetchById(productId: number): Promise<Product> {
    const { data } = await apiClient.get(`/products/${productId}`);
    return data;
  },
};
