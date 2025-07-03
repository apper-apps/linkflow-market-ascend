const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onCategoryChange(newCategories)
  }

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {categories.map((category) => (
        <label key={category} className="flex items-center">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryToggle(category)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-gray-700">{category}</span>
        </label>
      ))}
    </div>
  )
}

export default CategoryFilter