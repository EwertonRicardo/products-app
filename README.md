# ProductsApp

**ProductsApp** is a mobile application built with **React Native + TypeScript** that allows users to browse a product catalog using the **DummyJSON API**.  
The app follows **Clean Architecture** and **Layered Architecture**, decoupling API calls from UI, and uses **React Query** for data fetching, caching, and error handler

The app supports:

- Listing products with **image, title, and price**.
- Filtering products by category (e.g., electronics, clothing, groceries).
- Sorting products by `price` and `rating`.
- Product detail screen with **description, brand, and stock availability**.
- Deep links to open a specific product or category.
- Purchase reminder notifications via a **Native Module** (iOS).

---

## 🏗 Project Structure

```text
ProductsApp/
├─ src/
│  ├─ api/
│  │  └─ productsService.ts       # API calls, query params, data mappers
│  ├─ hooks/
│  │  ├─ useProducts.ts           # Product list hook
│  │  ├─ useCategories.ts         # Categories list hook
│  │  └─ useProductDetail.ts      # Product detail hook
│  ├─ components/
│  │  ├─ CategoriesList/
│  │  │  ├─ index.tsx
│  │  │  └─ CategoryItem.tsx
│  │  ├─ ProductsList/
│  │  │  ├─ index.tsx
│  │  │  └─ ProductItem.tsx
│  │  ├─ LoadingState.tsx
│  │  └─ ErrorState.tsx           # Receives message + refetch callback
│  ├─ navigation/
│  │  ├─ RootStack.tsx            # Global route typing
│  │  └─ index.tsx                # AppNavigator
│  ├─ screens/
│  │  ├─ HomeScreen.tsx           # Calls useProducts + useCategories
│  │  └─ ProductDetailScreen.tsx  # Calls useProductDetail
│  ├─ types.d.ts                  # Global types + navigation params
│  └─ modules/
│     └─ purchase-reminder/       # Native module/plugin for reminders
│        ├─ ios/
|        ├─ src/
│        ├─ index.ts              # JS bridge
│        └─ expo-module.config.json
├─ App.tsx
├─ app.json
├─ package.json
└─ tsconfig.json
```

---

## 🔧 Dependencies

- **React Native CLI / Expo CNG**
- **TypeScript**
- **Axios** – HTTP client
- **React Query (@tanstack/react-query)** – caching, loading, error
- **React Navigation** – stack navigator
- **react-native-safe-area-context** – SafeAreaView
- **react-native-actions-sheet** – action sheet
- **Native Module (`purchase-reminder`)** – adds product reminders

---

## 📝 API Layer

`src/api/productsService.ts` handles:

- `fetchAll({ category?, sortBy? })`: fetches products.
- `fetchById(productId)`: fetches product detail.
- `fetchCategories()`: fetches category list.
- Centralized query params interface for maintainability.

---

## ⚡ Hooks Layer

### `useProducts`
- Handles product list, filtering, sorting.
- Accepts optional `category`, `sortBy`.
- Returns `products`, `isLoading`, `isError`, and `handleProductPress(productId)`.
- Encapsulates **navigation** to ProductDetail.

### `useCategories`
- Fetches category list.
- Returns `categories`, `isLoading`, `isError`.

### `useProductDetail`
- Accepts `productId`.
- Returns `product`, `isLoading`, `isError`.
- Handles errors with `ErrorState`.

---

## 🖼 UI Layer (Components)

### Products
- **ProductsList** – renders a vertical FlatList of ProductItem.
- **ProductItem** – shows `thumbnail`, `title`, `price`, press triggers navigation.

### Categories
- **CategoriesList** – horizontal FlatList of CategoryItem.
- **CategoryItem** – shows category, press triggers filtering via hook callback.

### State Components
- **LoadingState** – full-screen loader.
- **ErrorState** – receives `message` and `onAction` callback. Can be used for navigation retry or refetch.

---

## 📺 Screens

### HomeScreen
- Calls `useProducts` and `useCategories`.
- Displays `CategoriesList` and `ProductsList`.
- Handles deep link category selection.

### ProductDetailScreen
- Calls `useProductDetail` using `productId` from `useRoute`.
- Displays full product info: thumbnail, title, price, brand, rating, stock, description.
- Includes **purchase reminder button** (calls Native Module).

---

## 🔔 Native Module: `purchase-reminder`

- Allows scheduling a product reminder in the device calendar.
- JS usage:
```ts
await addReminder(`Reminder for ${product.title}`, Date.now() + 5 * 60 * 1000);
```
- iOS: EventKit
- Configurable reminder time (avoid magic numbers).

---

## 🌐 Deep Links

- **Scheme**: `myproductsapp://`
- **Product Example**: `myproductsapp://product/16`
- **Category Example**: `myproductsapp://home?category=smartphones`

- **Android** (`app.json`):
```json
"intentFilters": [
  {
    "action": "VIEW",
    "data": [{ "scheme": "myproductsapp", "host": "*" }],
    "category": ["BROWSABLE", "DEFAULT"]
  }
]
```

- **iOS**: set in `CFBundleURLTypes` and `associatedDomains`.

---

## 📐 Clean Architecture

- **API Layer** – data fetching & mapping.
- **Hooks Layer** – business logic, deep links, navigation.
- **UI Layer** – dumb components, reusable.
- **Screens Layer** – call hooks and compose UI.
- **Navigation Layer** – typed stack navigator.
- **Types Layer** – global models & route types.

---

## 🏃 How to Run Locally

### Clone and install
```bash
git clone https://github.com/EwertonRicardo/products-app.git
cd ProductsApp
npm install
```

### Run on iOS
```bash
npx expo prebuild
npx expo run:ios
```

### Run on Android
```bash
npx expo prebuild
npx expo run:android
```

### Test deep links
#### iOS
```bash
xcrun simctl openurl booted "myproductsapp://product/16"
```

#### Android
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myproductsapp://product/16" com.anonymous.productsapp
```

---

## 📦 Notes

- Expo Go cannot handle custom deep links – use Dev Client or standalone build.
- All API calls include error handling and loading states.
- `ErrorState` and `LoadingState` components are reusable for all screens.
- Native Module is fully optional, but integrated in ProductDetailScreen.
```

