"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/utils/api"
import ProductCard from "./ProductCard"
import LoadingSpinner from "./LoadingSpinner"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProducts()
        // Get 4 random products as featured
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
        setProducts(shuffled.slice(0, 4))
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch featured products")
        setLoading(false)
      }
    }

    getFeaturedProducts()
  }, [])

  if (loading)
    return (

      <div id="featured" className="py-16 bg-white dark:bg-gray-900 min-w-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Featured Products</h2>
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div id="featured" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Featured Products</h2>
          <p className="text-center text-gray-800 dark:text-gray-100">{error}</p>
        </div>
      </div>
    )

  return (
    <div id="featured" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
