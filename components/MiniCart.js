"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function MiniCart({ onClose }) {
  const { cart, removeFromCart } = useCartStore()
  const cartRef = useRef(null)

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (

    <div className="absolute top-full right-0 mt-2 w-80 bg-white text-gray-900 dark:text-gray-100 dark:bg-gray-900 rounded-lg shadow-lg z-50 overflow-hidden animate-fadeIn">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium">Shopping Cart ({cart.length})</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close cart"
        >
          <X size={18} />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="p-4 text-center">
          <ShoppingBag size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center font-medium">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 flex gap-2">
            <Link
              href="/cart"
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-center py-2 rounded-md text-sm font-medium transition duration-300"
              onClick={onClose}
            >
              View Cart
            </Link>
            <Link
              href="/cart"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 rounded-md text-sm font-medium transition duration-300"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
