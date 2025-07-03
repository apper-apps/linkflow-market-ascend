import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import MetricBadge from '@/components/molecules/MetricBadge'

const SiteCard = ({ site, onAddToCart }) => {
  const navigate = useNavigate()
  
  const handleViewDetails = () => {
    navigate(`/sites/${site.Id}`)
  }
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart(site)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 cursor-pointer card"
      onClick={handleViewDetails}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{site.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{site.url}</p>
          <Badge variant="primary" size="small">{site.category}</Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${site.price}</div>
          <div className="text-sm text-gray-500">per placement</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <MetricBadge type="da" value={site.da} />
        <MetricBadge type="dr" value={site.dr} />
        <MetricBadge type="traffic" value={site.monthlyTraffic} />
        <MetricBadge type="spam" value={site.spamScore} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Link" className="w-4 h-4" />
          <span>{site.linkType}</span>
        </div>
        <Button
          variant="primary"
          size="small"
          icon="ShoppingCart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}

export default SiteCard