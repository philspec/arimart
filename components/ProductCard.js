"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCartStore()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      ...product,
      quantity: 1,
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative p-4 bg-white h-48 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            className="max-h-full transition-transform duration-300 transform group-hover:scale-110"
          />

          <div
            className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 h-12">{product.title}</h3>

          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.round(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">({product.rating.count})</span>
          </div>

          <div className="mt-auto">
            <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
