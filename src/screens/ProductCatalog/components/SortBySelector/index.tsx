import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SortBy } from "@models/product";

type SortOption = {
  id: SortBy;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  {
    id: "price",
    label: "Price",
  },
  {
    id: "rating",
    label: "Rating",
  },
];

type Props = {
  onSelectSortOption: (option: SortBy) => void;
  selectedSortOption: SortBy | undefined;
};

export const SortBySelector: FC<Props> = ({
  selectedSortOption,
  onSelectSortOption,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sort By </Text>

      <View style={styles.content}>
        {SORT_OPTIONS.map(({ label, id }) => {
          const isActive = selectedSortOption === id;
          return (
            <TouchableOpacity
              key={id}
              style={[styles.item, isActive && styles.activeItem]}
              activeOpacity={0.5}
              onPress={() => onSelectSortOption(id)}
            >
              <Text
                style={[styles.itemLabel, isActive && styles.activeItemLabel]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B6B6B",
  },
  content: {
    flexDirection: "row",
    gap: 8,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f6f8fc",
  },
  itemLabel: {
    color: "#6B6B6B",
  },
  activeItem: {
    backgroundColor: "#2dd55b4D",
  },
  activeItemLabel: {
    color: "green",
  },
});
