export interface Product {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
  description: string;
  brand: string;
  stock: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortBy = "price" | "rating";

export interface ProductQueryParams {
  category?: string;
  sortBy?: SortBy;
}
