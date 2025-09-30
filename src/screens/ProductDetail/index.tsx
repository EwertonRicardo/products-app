import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import type { RootStackParamList } from "@navigation/types";
import { useProductDetail } from "@hooks/useProductDetail";
import { addReminder } from "../../../modules/purchase-reminder";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ErrorState, LoadingState } from "@components";
import { Pill } from "./components";

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const isIOS = Platform.OS === "ios";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;

export const ProductDetail: FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation();

  const { productId } = route.params;

  const { product, isLoading, isError } = useProductDetail(productId);

  const insets = useSafeAreaInsets();

  const handlePurchaseReminder = useCallback(async () => {
    try {
      const reminderMessage = `Reminder: Check the product "${product?.title}" in 5 minutes.`;

      const dateToRemind = Date.now() + FIVE_MINUTES_IN_MS;

      const successMessage = await addReminder(reminderMessage, dateToRemind);
      alert(`${successMessage}. Reminder set for 5 minutes from now!`);
    } catch (error) {
      alert("Failed to set the reminder. Please try again.");
    }
  }, [product?.title]);

  const handleGoBack = useCallback(() => {
    const canGoBack = navigation.canGoBack();

    if (canGoBack) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "ProductCatalog" }],
      });
    }
  }, [navigation]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !product) {
    return (
      <ErrorState
        errorMessage="We couldn’t find this product. It may have been removed or is temporarily unavailable."
        actionLabel="Go Back"
        onAction={handleGoBack}
      />
    );
  }

  return (
    <React.Fragment>
      <View style={[styles.topSafeArea, { height: insets.top }]} />

      <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />

          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{product.title}</Text>

              <View style={styles.pillContainer}>
                <Pill label={`$ ${product.price}`} />
                <Pill label={`Brand - ${product.brand}`} />
                <Pill label={`Stock - ${product.stock}`} />
              </View>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            <View style={styles.footer}>
              {isIOS && (
                <TouchableOpacity
                  style={styles.purchaseReminderBtn}
                  onPress={handlePurchaseReminder}
                  activeOpacity={0.5}
                >
                  <Text style={styles.textBtn}>Set 5-minute Reminder</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.backBtn}
                onPress={handleGoBack}
                activeOpacity={0.5}
              >
                <Text style={styles.textBtn}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#f6f8fc",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    backgroundColor: "#f6f8fc",
    objectFit: "contain",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6B6B6B",
  },
  description: {
    marginTop: 16,
    color: "#6B6B6B",
  },
  purchaseReminderBtn: {
    backgroundColor: "#f6f8fc",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  backBtn: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#000",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  textBtn: {
    color: "#6B6B6B",
  },
  footer: {
    gap: 16,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
