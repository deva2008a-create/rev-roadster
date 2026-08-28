import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type User = { name: string; email: string };

type StoreValue = {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "bikezone.state.v1";

function read() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = read();
    if (saved) {
      setWishlist(saved.wishlist ?? []);
      setCart(saved.cart ?? []);
      setUser(saved.user ?? null);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify({ wishlist, cart, user }));
  }, [wishlist, cart, user]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      wishlist,
      toggleWishlist,
      isWished: (id: string) => wishlist.includes(id),
      cart,
      addToCart: (id: string) => setCart((prev) => (prev.includes(id) ? prev : [...prev, id])),
      removeFromCart: (id: string) => setCart((prev) => prev.filter((x) => x !== id)),
      user,
      signIn: (u: User) => setUser(u),
      signOut: () => setUser(null),
    }),
    [wishlist, cart, user, toggleWishlist],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
