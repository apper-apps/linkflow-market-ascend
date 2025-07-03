import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { orderService } from '@/services/api/orderService'
import { siteService } from '@/services/api/siteService'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const [ordersData, sitesData] = await Promise.all([
        orderService.getAll(),
        siteService.getAll()
      ])
      setOrders(ordersData)
      setSites(sitesData)
    } catch (err) {
      setError(err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadOrders()
  }, [])
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'error'
      default:
        return 'info'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle'
      case 'pending':
        return 'Clock'
      case 'cancelled':
        return 'XCircle'
      default:
        return 'Package'
    }
  }
  
  const getSiteById = (siteId) => {
    return sites.find(site => site.Id === siteId)
  }
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <Loading type="list" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error message={error} onRetry={loadOrders} />
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-card p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">
          Track your sponsored content placement orders
        </p>
      </div>
      
      {orders.length === 0 ? (
        <Empty
          title="No orders yet"
          description="You haven't placed any orders for sponsored content placements"
          action={() => window.location.href = '/'}
          actionLabel="Browse Sites"
          icon="Package"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const site = getSiteById(order.siteId)
            return (
              <motion.div
                key={order.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <ApperIcon name={getStatusIcon(order.status)} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order #{order.Id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                
                {site && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {site.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {site.url}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="primary" size="small">
                            {site.category}
                          </Badge>
                          <Badge variant="secondary" size="small">
                            {site.linkType}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${order.price}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total paid
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>Ordered {format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="small" icon="Eye">
                      View Details
                    </Button>
                    {order.status === 'pending' && (
                      <Button variant="ghost" size="small" icon="MessageCircle">
                        Contact Support
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyOrders