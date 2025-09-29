import React, { FC } from "react";
import { Category } from "@models/category";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = Category & {
  onPressCategory: (slug: string) => void;
  isActive: boolean;
};

export const CategoryItem: FC<Props> = React.memo(
  ({ name, slug, isActive, onPressCategory }) => {
    return (
      <TouchableOpacity
        style={[styles.container, isActive && styles.activeCategory]}
        onPress={() => onPressCategory(slug)}
        activeOpacity={0.5}
      >
        <Text style={[styles.text, isActive && styles.activeText]}>{name}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  activeCategory: {
    backgroundColor: "#2dd55b4D",
  },
  text: {
    color: "#6B6B6B",
  },
  activeText: {
    color: "green",
  },
});
