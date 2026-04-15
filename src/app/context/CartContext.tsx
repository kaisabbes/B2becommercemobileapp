import React, { createContext, useContext, useState, useCallback } from "react";

/* ── Cart item: keyed by SKU ──────────────────────────────────── */
export type CartItem = {
  sku: string;       // unique variant identifier
  productId: string;
  name: string;      // color/design name
  category: string;
  finition: string;
  taille: string;
  epaisseur: string;
  unitPrice: number; // HT, already tiered
  qty: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  /** Add a variant to the cart. If the SKU already exists, merges qty. */
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  /** Remove a line by SKU */
  removeFromCart: (sku: string) => void;
  /** Update quantity for a SKU */
  updateQty: (sku: string, qty: number) => void;
  /** Total unique SKU lines */
  cartCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

const INITIAL_CART: CartItem[] = [
  {
    sku: "MEL-3012-2",
    productId: "mel-1",
    name: "CREME 3012",
    category: "melamine",
    finition: "Crème",
    taille: "2800×2070",
    epaisseur: "18mm",
    unitPrice: 14.00, // 10+ tier
    qty: 25,
    image: "http://mpbs.com.tn/wp-content/uploads/2025/07/CREME-3012.jpg",
  },
  {
    sku: "PLA-CHRC-3",
    productId: "pla-4",
    name: "CHENE FIL RC",
    category: "plaques",
    finition: "Chêne",
    taille: "3050×1220",
    epaisseur: "18mm",
    unitPrice: 22.50,
    qty: 10,
    image: "http://mpbs.com.tn/wp-content/uploads/2021/03/Chene-FAF-Rec.jpg",
  },
  {
    sku: "ACR-FGRN-1",
    productId: "acr-3",
    name: "FIR GREEN",
    category: "acryliques",
    finition: "Vert",
    taille: "3050×1220",
    epaisseur: "18mm",
    unitPrice: 15.28, // 50+ tier  (19.10 * 0.80)
    qty: 50,
    image: "http://mpbs.com.tn/wp-content/uploads/2024/05/FIR-GREEN.jpg",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      const qty = item.qty ?? 1;
      setCart((prev) => {
        const existing = prev.find((c) => c.sku === item.sku);
        if (existing) {
          return prev.map((c) =>
            c.sku === item.sku ? { ...c, qty: c.qty + qty } : c
          );
        }
        return [...prev, { ...item, qty }];
      });
    },
    []
  );

  const removeFromCart = useCallback((sku: string) => {
    setCart((prev) => prev.filter((c) => c.sku !== sku));
  }, []);

  const updateQty = useCallback((sku: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((c) => (c.sku === sku ? { ...c, qty } : c))
    );
  }, []);

  const cartCount = cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
