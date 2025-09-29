import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
};

export const Pill: FC<Props> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#f6f8fc",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    color: "#6B6B6B",
  },
});
