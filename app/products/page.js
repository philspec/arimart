"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { fetchProducts } from "@/utils/api"
import ProductFilter from "@/components/ProductFilter"
import SearchBar from "@/components/SearchBar"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("default")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data)
        setFilteredProducts(data)

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product) => product.category))]
        setCategories(uniqueCategories)

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products. Please try again later.")
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate)
    }

    setFilteredProducts(result)
  }, [products, searchTerm, sortOption, categoryFilter])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const handleCategoryChange = (category) => {
    setCategoryFilter(category)
  }

  if (loading) return <LoadingSpinner />

  if (error) return <div className="container mx-auto px-4 py-8 text-center min-h-screen bg-emerald-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{error}</div>

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilter
            categories={categories}
            onSortChange={handleSortChange}
            onCategoryChange={handleCategoryChange}
            selectedCategory={categoryFilter}
            selectedSort={sortOption}
          />
        </div>

        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 bg-emerald-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <p className="text-xl">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}
