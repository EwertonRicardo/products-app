import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  onFilterPress: () => void;
};

export const Header: FC<Props> = ({ onFilterPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TouchableOpacity onPress={onFilterPress} activeOpacity={0.5}>
        <Ionicons name="filter" size={24} color="#6B6B6B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B6B6B",
  },
});
