import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No results found", 
  description = "Try adjusting your filters or search criteria",
  action,
  actionLabel = "Clear Filters",
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-card p-8"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="Filter" className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </motion.div>
  )
}

export default Empty