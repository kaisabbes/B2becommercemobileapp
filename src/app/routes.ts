import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./components/screens/LoginScreen";
import { FamilyCatalogScreen } from "./components/screens/FamilyCatalogScreen";
import { FamilyProductsScreen } from "./components/screens/FamilyProductsScreen";
import { ProductDetailsScreen } from "./components/screens/ProductDetailsScreen";
import { CartScreen } from "./components/screens/CartScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: FamilyCatalogScreen },
      { path: "catalog", Component: FamilyCatalogScreen },
      { path: "catalog/:familyId", Component: FamilyProductsScreen },
      { path: "product/:id", Component: ProductDetailsScreen },
      { path: "cart", Component: CartScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
