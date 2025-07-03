import { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const AdminSiteForm = ({ site, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    da: '',
    dr: '',
    monthlyTraffic: '',
    spamScore: '',
    price: '',
    category: '',
    linkType: 'Dofollow',
    siteType: 'Blog',
    description: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (site) {
      setFormData({
        name: site.name || '',
        url: site.url || '',
        da: site.da?.toString() || '',
        dr: site.dr?.toString() || '',
        monthlyTraffic: site.monthlyTraffic?.toString() || '',
        spamScore: site.spamScore?.toString() || '',
        price: site.price?.toString() || '',
        category: site.category || '',
        linkType: site.linkType || 'Dofollow',
        siteType: site.siteType || 'Blog',
        description: site.description || ''
      })
    }
  }, [site])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Site name is required'
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required'
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.url)) {
      newErrors.url = 'Please enter a valid domain (e.g., example.com)'
    }

    if (!formData.da || formData.da < 1 || formData.da > 100) {
      newErrors.da = 'DA must be between 1 and 100'
    }

    if (!formData.dr || formData.dr < 1 || formData.dr > 100) {
      newErrors.dr = 'DR must be between 1 and 100'
    }

    if (!formData.monthlyTraffic || formData.monthlyTraffic < 0) {
      newErrors.monthlyTraffic = 'Monthly traffic must be a positive number'
    }

    if (!formData.spamScore || formData.spamScore < 0 || formData.spamScore > 100) {
      newErrors.spamScore = 'Spam score must be between 0 and 100'
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Price must be a positive number'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const submitData = {
      ...formData,
      da: parseInt(formData.da),
      dr: parseInt(formData.dr),
      monthlyTraffic: parseInt(formData.monthlyTraffic),
      spamScore: parseInt(formData.spamScore),
      price: parseFloat(formData.price)
    }

    onSubmit(submitData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {site ? 'Edit Site' : 'Add New Site'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Enter site name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <Input
                  value={formData.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  error={errors.url}
                  placeholder="example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain Authority (DA) *
                </label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.da}
                  onChange={(e) => handleChange('da', e.target.value)}
                  error={errors.da}
                  placeholder="1-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain Rating (DR) *
                </label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.dr}
                  onChange={(e) => handleChange('dr', e.target.value)}
                  error={errors.dr}
                  placeholder="1-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Traffic *
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.monthlyTraffic}
                  onChange={(e) => handleChange('monthlyTraffic', e.target.value)}
                  error={errors.monthlyTraffic}
                  placeholder="Monthly visitors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spam Score *
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.spamScore}
                  onChange={(e) => handleChange('spamScore', e.target.value)}
                  error={errors.spamScore}
                  placeholder="0-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  error={errors.price}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  error={errors.category}
                  placeholder="e.g., Technology, Health"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Type *
                </label>
                <select
                  value={formData.linkType}
                  onChange={(e) => handleChange('linkType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Dofollow">Dofollow</option>
                  <option value="Nofollow">Nofollow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Type *
                </label>
                <select
                  value={formData.siteType}
                  onChange={(e) => handleChange('siteType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Blog">Blog</option>
                  <option value="News">News</option>
                  <option value="Magazine">Magazine</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the site and its target audience..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                icon={site ? 'Save' : 'Plus'}
              >
                {site ? 'Update Site' : 'Add Site'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminSiteForm