const RangeSlider = ({ 
  label, 
  min = 0, 
  max = 100, 
  value, 
  onChange, 
  className = '',
  showValue = true,
  formatter = (val) => val
}) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    onChange(newValue)
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-500">
              {formatter(value)}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="range-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatter(min)}</span>
          <span>{formatter(max)}</span>
        </div>
      </div>
    </div>
  )
}

export default RangeSlider