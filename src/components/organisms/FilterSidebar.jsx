import { useState } from 'react'
import FilterSection from '@/components/molecules/FilterSection'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import RangeSlider from '@/components/atoms/RangeSlider'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const categories = [
    "General (Uncategorized)",
    "Software & SaaS",
    "Digital Marketing & SEO",
    "Business & Finance",
    "Real Estate",
    "Automotive",
    "Tech",
    "Business (General)",
    "Finance (General)",
    "Health",
    "Education",
    "Lifestyle",
    "Fashion",
    "Sports",
    "Travel",
    "Marketing (General)",
    "Law",
    "Crypto",
    "Entertainment",
    "Wedding",
    "Pets",
    "Home Improvement",
    "Photography",
    "Food & Cooking",
    "Gaming",
    "Beauty",
    "Family & Parenting",
    "Science",
    "News"
  ]
  
  const linkTypes = ["Dofollow", "Nofollow", "Both"]
  const siteTypes = ["Blog", "News", "Magazine", "Corporate", "Directory", "Forum"]
  
  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }
  
  const formatCurrency = (value) => `$${value}`
  const formatTraffic = (value) => `${(value / 1000).toFixed(0)}K`
  
  return (
    <div className="w-80 bg-white rounded-xl shadow-card p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button
          variant="ghost"
          size="small"
          icon="RotateCcw"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        <FilterSection title="Domain Authority" defaultOpen>
          <RangeSlider
            min={0}
            max={100}
            value={filters.daMax}
            onChange={(value) => updateFilter('daMax', value)}
            formatter={(val) => `${val}+`}
          />
        </FilterSection>
        
        <FilterSection title="Domain Rating" defaultOpen>
          <RangeSlider
            min={0}
            max={100}
            value={filters.drMax}
            onChange={(value) => updateFilter('drMax', value)}
            formatter={(val) => `${val}+`}
          />
        </FilterSection>
        
        <FilterSection title="Monthly Traffic" defaultOpen>
          <RangeSlider
            min={1000}
            max={1000000}
            value={filters.trafficMin}
            onChange={(value) => updateFilter('trafficMin', value)}
            formatter={formatTraffic}
          />
        </FilterSection>
        
        <FilterSection title="Spam Score" defaultOpen>
          <RangeSlider
            min={0}
            max={100}
            value={filters.spamMax}
            onChange={(value) => updateFilter('spamMax', value)}
            formatter={(val) => `${val}%`}
          />
        </FilterSection>
        
        <FilterSection title="Price Range" defaultOpen>
          <div className="space-y-4">
            <RangeSlider
              label="Maximum Price"
              min={50}
              max={2000}
              value={filters.priceMax}
              onChange={(value) => updateFilter('priceMax', value)}
              formatter={formatCurrency}
            />
          </div>
        </FilterSection>
        
        <FilterSection title="Categories">
          <CategoryFilter
            categories={categories}
            selectedCategories={filters.categories}
            onCategoryChange={(categories) => updateFilter('categories', categories)}
          />
        </FilterSection>
        
        <FilterSection title="Link Type">
          <div className="space-y-2">
            {linkTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="linkType"
                  value={type}
                  checked={filters.linkType === type}
                  onChange={(e) => updateFilter('linkType', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        <FilterSection title="Site Type">
          <div className="space-y-2">
            {siteTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.siteTypes.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.siteTypes, type]
                      : filters.siteTypes.filter(t => t !== type)
                    updateFilter('siteTypes', newTypes)
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

export default FilterSidebar