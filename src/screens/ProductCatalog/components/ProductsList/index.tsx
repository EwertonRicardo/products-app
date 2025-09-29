import React, { FC } from "react";
import { FlatList } from "react-native";
import { Product } from "@models/product";
import { ProductItem } from "./ProductItem";
import { LoadingState } from "@components";

type Props = {
  products: Product[];
  isLoading: boolean;
  onProductPress: (productId: number) => void;
};

const keyExtractor = (product: Product) => String(product.id);

export const ProductsList: FC<Props> = ({
  products,
  isLoading,
  onProductPress,
}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <ProductItem {...item} onProductPress={onProductPress} />
      )}
      ListHeaderComponent={isLoading ? <LoadingState /> : null}
    />
  );
};
