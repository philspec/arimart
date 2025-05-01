"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <LoadingSpinner />

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const shippingCost = 10.0
  const subtotal = calculateSubtotal()
  const total = subtotal + (subtotal > 0 ? shippingCost : 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <ShoppingBag size={64} className="mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" className="btn btn-primary btn-md">
            Start Shopping
          </Link>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 hidden md:flex">
                <div className="w-2/5 font-semibold">Product</div>
                <div className="w-1/5 font-semibold text-center">Price</div>
                <div className="w-1/5 font-semibold text-center">Quantity</div>
                <div className="w-1/5 font-semibold text-right">Total</div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center"
                >
                  <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-md"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                    </div>
                  </div>

                  <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                    <span className="md:hidden font-semibold mr-2">Price:</span>${item.price.toFixed(2)}
                  </div>

                  <div className="w-full md:w-1/5 flex justify-center items-center mb-4 md:mb-0">
                    <span className="md:hidden font-semibold mr-2">Quantity:</span>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-1/5 text-right flex justify-between md:justify-end items-center">
                    <span className="md:hidden font-semibold mr-2">Total:</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-4 flex justify-end">
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 transition duration-300">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${subtotal > 0 ? shippingCost.toFixed(2) : "0.00"}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full btn btn-primary btn-md">Proceed to Checkout</button>

              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-emerald-600 hover:text-emerald-800 flex items-center justify-center"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
