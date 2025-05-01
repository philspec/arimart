"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { fetchProductById } from "@/utils/api"
import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartStore()

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.")
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      })
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500 min-h-screen bg-emerald-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">{error}</div>

  if (!product) return <div className="container mx-auto px-4 py-8 text-center min-h-screen bg-emerald-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">Product not found</div>

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg p-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              className="p-4"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.round(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold mb-4 text-emerald-600">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input w-24"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleAddToCart} className="btn btn-primary btn-md w-full md:w-auto">
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
