"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.id === product.id)

        if (existingItem) {
          // Update quantity if item already exists
          const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item,
          )
          set({ cart: updatedCart })
        } else {
          // Add new item
          set({ cart: [...cart, product] })
        }
      },

      removeFromCart: (productId) => {
        const cart = get().cart
        const updatedCart = cart.filter((item) => item.id !== productId)
        set({ cart: updatedCart })
      },

      updateQuantity: (productId, quantity) => {
        const cart = get().cart
        const updatedCart = cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
        set({ cart: updatedCart })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage", // name of the item in localStorage
      skipHydration: true, // Skip hydration to prevent hydration mismatch
    },
  ),
)
