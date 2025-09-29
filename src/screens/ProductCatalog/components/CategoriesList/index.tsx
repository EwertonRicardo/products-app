import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { CategoryItem } from "./CategoryItem";
import { Category } from "@models/category";

type Props = {
  categories: Category[];
  activeCategory: string | undefined;
  onPressCategory: (slug: string) => void;
};

export const CategoriesList: FC<Props> = ({
  categories,
  activeCategory,
  onPressCategory,
}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <CategoryItem
          {...item}
          onPressCategory={onPressCategory}
          isActive={item.slug === activeCategory}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
  },
});
