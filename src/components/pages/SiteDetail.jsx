import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import MetricBadge from '@/components/molecules/MetricBadge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { siteService } from '@/services/api/siteService'
import { useCart } from '@/hooks/useCart'

const SiteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  
  const loadSite = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await siteService.getById(parseInt(id))
      setSite(data)
    } catch (err) {
      setError(err.message || 'Failed to load site details')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadSite()
  }, [id])
  
  const handleAddToCart = () => {
    addToCart(site)
    toast.success(`${site.name} added to cart!`)
  }
  
  const handleGoBack = () => {
    navigate('/')
  }
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-card p-8 animate-pulse">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error message={error} onRetry={loadSite} />
      </div>
    )
  }
  
  if (!site) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error message="Site not found" />
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-card overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="small"
              icon="ArrowLeft"
              onClick={handleGoBack}
            >
              Back to Sites
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {site.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <ApperIcon name="Globe" className="w-4 h-4" />
                  <a 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {site.url}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{site.category}</Badge>
                  <Badge variant="secondary">{site.siteType}</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Site Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {site.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Link Details
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Link" className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Link Type:</span>
                    <Badge variant="info" size="small">{site.linkType}</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Site Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <MetricBadge type="da" value={site.da} className="text-lg" />
                    <p className="text-sm text-gray-600 mt-1">Domain Authority</p>
                  </div>
                  <div className="text-center">
                    <MetricBadge type="dr" value={site.dr} className="text-lg" />
                    <p className="text-sm text-gray-600 mt-1">Domain Rating</p>
                  </div>
                  <div className="text-center">
                    <MetricBadge type="traffic" value={site.monthlyTraffic} className="text-lg" />
                    <p className="text-sm text-gray-600 mt-1">Monthly Traffic</p>
                  </div>
                  <div className="text-center">
                    <MetricBadge type="spam" value={site.spamScore} className="text-lg" />
                    <p className="text-sm text-gray-600 mt-1">Spam Score</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${site.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      per sponsored content placement
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="large"
                    icon="ShoppingCart"
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="Shield" className="w-4 h-4" />
                    <span>Secure checkout with multiple payment options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SiteDetail