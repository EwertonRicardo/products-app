import React, { FC } from "react";
import { Product } from "../../../../models/product";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

type Props = Product & {
  onProductPress: (productId: number) => void;
};

export const ProductItem: FC<Props> = React.memo(
  ({ id, price, thumbnail, title, onProductPress }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.5}
        onPress={() => onProductPress(id)}
      >
        <Image source={{ uri: thumbnail }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  info: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B6B6B",
  },
  price: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 4,
  },
});
