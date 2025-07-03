import siteData from '@/services/mockData/sites.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const siteService = {
  async getAll() {
    await delay(300)
    return [...siteData]
  },
  
  async getById(id) {
    await delay(200)
    const site = siteData.find(s => s.Id === id)
    if (!site) {
      throw new Error('Site not found')
    }
    return { ...site }
  },
  
  async create(site) {
    await delay(400)
    const newSite = {
      ...site,
      Id: Math.max(...siteData.map(s => s.Id)) + 1
    }
    siteData.push(newSite)
    return { ...newSite }
  },
  
  async update(id, updates) {
    await delay(300)
    const index = siteData.findIndex(s => s.Id === id)
    if (index === -1) {
      throw new Error('Site not found')
    }
    siteData[index] = { ...siteData[index], ...updates }
    return { ...siteData[index] }
  },
  
  async delete(id) {
    await delay(250)
    const index = siteData.findIndex(s => s.Id === id)
    if (index === -1) {
      throw new Error('Site not found')
    }
    siteData.splice(index, 1)
    return true
  }
}