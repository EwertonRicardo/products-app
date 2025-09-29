import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import type { RootStackParamList } from "@navigation/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductCatalog } from "@screens/ProductCatalog";
import { ProductDetail } from "@screens/ProductDetail";

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["myproductsapp://"],
  config: {
    screens: {
      ProductCatalog: {
        path: "category/:category?",
      },
      ProductDetail: {
        path: "product/:productId",
        parse: {
          productId: (id: string) => Number(id),
        },
      },
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="ProductCatalog">
        <Stack.Screen
          name="ProductCatalog"
          component={ProductCatalog}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
