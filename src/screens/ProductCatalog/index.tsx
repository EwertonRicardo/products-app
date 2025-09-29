import React, { FC, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useProducts } from "@hooks/useProducts";
import {
  CategoriesList,
  Header,
  ProductsList,
  SortBySelector,
} from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategories } from "@hooks/useCategories";
import { SortBy } from "@models/product";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import { ErrorState } from "@components";

type ProductCatalogRouteProp = RouteProp<RootStackParamList, "ProductCatalog">;

export const ProductCatalog: FC = () => {
  const route = useRoute<ProductCatalogRouteProp>();
  const initialCategoryFromLink = route.params?.category;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategoryFromLink
  );
  const [selectedSortOption, setSelectedSortOption] = useState<
    SortBy | undefined
  >();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const {
    products,
    loadingProducts,
    isError,
    handleProductPress,
    refetchProducts,
  } = useProducts({
    category: selectedCategory,
    sortBy: selectedSortOption,
  });

  const { categories } = useCategories();

  const handlePressCategory = useCallback(
    (slug: string) => {
      const newCategory = slug !== selectedCategory ? slug : "";

      setSelectedCategory(newCategory);
    },
    [selectedCategory]
  );

  const handleOpenSortSheet = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  const handleSelectSortBy = useCallback(
    (sortByFilter: SortBy) => {
      const isSameOption = selectedSortOption === sortByFilter;

      const newSortOption = isSameOption ? undefined : sortByFilter;

      setSelectedSortOption(newSortOption);
      actionSheetRef.current?.hide();
    },
    [selectedSortOption]
  );

  if (isError) {
    return (
      <ErrorState
        errorMessage="Failed to load products"
        onAction={refetchProducts}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onFilterPress={handleOpenSortSheet} />

      <View style={styles.container}>
        <View>
          <CategoriesList
            categories={categories}
            activeCategory={selectedCategory}
            onPressCategory={handlePressCategory}
          />
        </View>

        <View style={styles.productsContainer}>
          <ProductsList
            products={products}
            onProductPress={handleProductPress}
            isLoading={loadingProducts}
          />
        </View>
      </View>

      <ActionSheet ref={actionSheetRef} containerStyle={{ height: "20%" }}>
        <SortBySelector
          selectedSortOption={selectedSortOption}
          onSelectSortOption={handleSelectSortBy}
        />
      </ActionSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f8fc",
  },
  container: {
    flex: 1,
    gap: 8,
    marginTop: 16,
  },
  productsContainer: {
    flex: 1,
  },
});
