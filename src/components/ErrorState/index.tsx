import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  errorMessage: string;
  actionLabel?: string;
  onAction: () => void;
};

export const ErrorState: FC<Props> = ({
  errorMessage,
  onAction,
  actionLabel = "Try Again",
}) => {
  return (
    <View style={style.container}>
      <Text style={style.message}>{errorMessage}</Text>

      <TouchableOpacity
        onPress={onAction}
        activeOpacity={0.5}
        style={style.btn}
      >
        <Text style={style.btnText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f6f8fc",
    paddingHorizontal: 16,
    gap: 24,
  },
  message: {
    fontWeight: "bold",
    color: "#6B6B6B",
    fontSize: 24,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#c5000f14",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#ad000d",
  },
});
