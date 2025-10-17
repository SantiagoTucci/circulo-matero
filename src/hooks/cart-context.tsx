"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: action.payload.quantity === 0
          ? state.items.filter(item => item.id !== action.payload.id)
          : state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            )
      };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "SET_CART_OPEN":
      return { ...state, isOpen: action.payload };
    case "LOAD_CART":
      return action.payload;
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Funciones de "cifrado" simple con Base64
const encrypt = (data: any) => btoa(JSON.stringify(data));
const decrypt = (data: string) => JSON.parse(atob(data));

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart: CartState = decrypt(savedCart);
        if (Array.isArray(parsedCart.items) && typeof parsedCart.isOpen === "boolean") {
          dispatch({ type: "LOAD_CART", payload: parsedCart });
        }
      } catch {
        console.warn("Cart corrupted or tampered. Resetting cart.");
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    try {
      const encrypted = encrypt(state);
      localStorage.setItem("cart", encrypted);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [state]);

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const openCart = () => dispatch({ type: "SET_CART_OPEN", payload: true });
  const closeCart = () => dispatch({ type: "SET_CART_OPEN", payload: false });
  const getTotal = () => state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
