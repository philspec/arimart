"use client"

export default function ProductFilter({ categories, onSortChange, onCategoryChange, selectedCategory, selectedSort }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="category-all"
              name="category"
              value="all"
              checked={selectedCategory === "all"}
              onChange={() => onCategoryChange("all")}
              className="mr-2"
            />
            <label htmlFor="category-all">All Categories</label>
          </div>

          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={`category-${category}`} className="capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        <select value={selectedSort} onChange={(e) => onSortChange(e.target.value)} className="input">
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  )
}
