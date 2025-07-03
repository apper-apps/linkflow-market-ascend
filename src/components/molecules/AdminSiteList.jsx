import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

const AdminSiteList = ({ sites, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortedSites = [...sites].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    return sortOrder === 'asc' 
      ? aValue - bValue
      : bValue - aValue
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ChevronsUpDown'
    return sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'
  }

  const formatTraffic = (traffic) => {
    if (traffic >= 1000000) {
      return `${(traffic / 1000000).toFixed(1)}M`
    }
    if (traffic >= 1000) {
      return `${(traffic / 1000).toFixed(1)}K`
    }
    return traffic.toString()
  }

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Site Name
                  <ApperIcon name={getSortIcon('name')} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Category
                  <ApperIcon name={getSortIcon('category')} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('da')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  DA/DR
                  <ApperIcon name={getSortIcon('da')} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('monthlyTraffic')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Traffic
                  <ApperIcon name={getSortIcon('monthlyTraffic')} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Price
                  <ApperIcon name={getSortIcon('price')} className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </span>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedSites.map((site) => (
              <tr key={site.Id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {site.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {site.url}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary" size="small">
                    {site.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {site.da}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-sm font-medium text-gray-900">
                      {site.dr}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {formatTraffic(site.monthlyTraffic)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    ${site.price}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Badge 
                      variant={site.linkType === 'Dofollow' ? 'success' : 'warning'}
                      size="small"
                    >
                      {site.linkType}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {site.siteType}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="small"
                      icon="Edit"
                      onClick={() => onEdit(site)}
                      className="text-blue-600 hover:text-blue-700"
                    />
                    <Button
                      variant="ghost"
                      size="small"
                      icon="Trash2"
                      onClick={() => onDelete(site.Id)}
                      className="text-red-600 hover:text-red-700"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSiteList