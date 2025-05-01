// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products")

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories")

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}
