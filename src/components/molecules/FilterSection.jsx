import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import RangeSlider from '@/components/atoms/RangeSlider'
import Button from '@/components/atoms/Button'

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="w-4 h-4 text-gray-400"
        />
      </button>
      {isOpen && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  )
}

export default FilterSection