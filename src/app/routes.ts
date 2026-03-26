import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./components/screens/LoginScreen";
import { CatalogScreen } from "./components/screens/CatalogScreen";
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
      { index: true, Component: CatalogScreen },
      { path: "catalog", Component: CatalogScreen },
      { path: "product/:id", Component: ProductDetailsScreen },
      { path: "cart", Component: CartScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
