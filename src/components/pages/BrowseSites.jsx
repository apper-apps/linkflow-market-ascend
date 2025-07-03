import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import FilterSidebar from '@/components/organisms/FilterSidebar'
import SiteCard from '@/components/molecules/SiteCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { siteService } from '@/services/api/siteService'
import { useCart } from '@/hooks/useCart'

const BrowseSites = () => {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('price-low')
  const [filters, setFilters] = useState({
    daMax: 100,
    drMax: 100,
    trafficMin: 1000,
    spamMax: 100,
    priceMax: 2000,
    categories: [],
    linkType: 'Both',
    siteTypes: []
  })
  
  const { addToCart } = useCart()
  
  const loadSites = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await siteService.getAll()
      setSites(data)
    } catch (err) {
      setError(err.message || 'Failed to load sites')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadSites()
  }, [])
  
  const handleAddToCart = (site) => {
    addToCart(site)
    toast.success(`${site.name} added to cart!`)
  }
  
  const handleClearFilters = () => {
    setFilters({
      daMax: 100,
      drMax: 100,
      trafficMin: 1000,
      spamMax: 100,
      priceMax: 2000,
      categories: [],
      linkType: 'Both',
      siteTypes: []
    })
  }
  
  const filteredSites = sites.filter(site => {
    if (site.da < filters.daMax) return false
    if (site.dr < filters.drMax) return false
    if (site.monthlyTraffic < filters.trafficMin) return false
    if (site.spamScore > filters.spamMax) return false
    if (site.price > filters.priceMax) return false
    if (filters.categories.length > 0 && !filters.categories.includes(site.category)) return false
    if (filters.linkType !== 'Both' && site.linkType !== filters.linkType) return false
    if (filters.siteTypes.length > 0 && !filters.siteTypes.includes(site.siteType)) return false
    return true
  })
  
  const sortedSites = [...filteredSites].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'da-high':
        return b.da - a.da
      case 'dr-high':
        return b.dr - a.dr
      case 'traffic-high':
        return b.monthlyTraffic - a.monthlyTraffic
      default:
        return 0
    }
  })
  
  if (loading) {
    return (
      <div className="flex gap-8">
        <div className="w-80">
          <div className="bg-white rounded-xl shadow-card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Loading type="grid" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex gap-8">
        <div className="w-80">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            <p className="text-gray-500">Unable to load filters</p>
          </div>
        </div>
        <div className="flex-1">
          <Error message={error} onRetry={loadSites} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex gap-8">
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />
      
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Premium Content Placement Sites
              </h1>
              <p className="text-gray-600">
                {sortedSites.length} sites available for sponsored content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="da-high">Domain Authority: High to Low</option>
                <option value="dr-high">Domain Rating: High to Low</option>
                <option value="traffic-high">Traffic: High to Low</option>
              </select>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="small"
                  icon="Grid3X3"
                  onClick={() => setViewMode('grid')}
                />
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="small"
                  icon="List"
                  onClick={() => setViewMode('list')}
                />
              </div>
            </div>
          </div>
        </div>
        
        {sortedSites.length === 0 ? (
          <Empty
            title="No sites match your criteria"
            description="Try adjusting your filters to see more results"
            action={handleClearFilters}
            actionLabel="Clear Filters"
            icon="Filter"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
          >
            {sortedSites.map((site) => (
              <SiteCard
                key={site.Id}
                site={site}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BrowseSites