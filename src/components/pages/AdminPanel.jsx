import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { siteService } from '@/services/api/siteService'
import AdminSiteList from '@/components/molecules/AdminSiteList'
import AdminSiteForm from '@/components/molecules/AdminSiteForm'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const AdminPanel = () => {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSite, setEditingSite] = useState(null)

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await siteService.getAll()
      setSites(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load sites')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSite = () => {
    setEditingSite(null)
    setShowForm(true)
  }

  const handleEditSite = (site) => {
    setEditingSite(site)
    setShowForm(true)
  }

  const handleDeleteSite = async (siteId) => {
    if (!confirm('Are you sure you want to delete this site? This action cannot be undone.')) {
      return
    }

    try {
      await siteService.delete(siteId)
      setSites(prev => prev.filter(site => site.Id !== siteId))
      toast.success('Site deleted successfully')
    } catch (err) {
      toast.error('Failed to delete site')
    }
  }

  const handleFormSubmit = async (siteData) => {
    try {
      if (editingSite) {
        const updatedSite = await siteService.update(editingSite.Id, siteData)
        setSites(prev => prev.map(site => 
          site.Id === editingSite.Id ? updatedSite : site
        ))
        toast.success('Site updated successfully')
      } else {
        const newSite = await siteService.create(siteData)
        setSites(prev => [...prev, newSite])
        toast.success('Site created successfully')
      }
      setShowForm(false)
      setEditingSite(null)
    } catch (err) {
      toast.error(`Failed to ${editingSite ? 'update' : 'create'} site`)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingSite(null)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadSites} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-gray-600">
              Manage sponsored content placement sites
            </p>
          </div>
          <Button
            onClick={handleAddSite}
            icon="Plus"
            className="w-full sm:w-auto"
          >
            Add New Site
          </Button>
        </div>
      </div>

      {sites.length === 0 ? (
        <Empty
          title="No sites found"
          description="Get started by adding your first site for sponsored content placement."
          actionLabel="Add Site"
          onAction={handleAddSite}
        />
      ) : (
        <AdminSiteList
          sites={sites}
          onEdit={handleEditSite}
          onDelete={handleDeleteSite}
        />
      )}

      {showForm && (
        <AdminSiteForm
          site={editingSite}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  )
}

export default AdminPanel