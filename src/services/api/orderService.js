import orderData from '@/services/mockData/orders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const orderService = {
  async getAll() {
    await delay(300)
    return [...orderData]
  },
  
  async getById(id) {
    await delay(200)
    const order = orderData.find(o => o.Id === id)
    if (!order) {
      throw new Error('Order not found')
    }
    return { ...order }
  },
  
  async create(order) {
    await delay(400)
    const newOrder = {
      ...order,
      Id: Math.max(...orderData.map(o => o.Id)) + 1
    }
    orderData.push(newOrder)
    return { ...newOrder }
  },
  
  async update(id, updates) {
    await delay(300)
    const index = orderData.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    orderData[index] = { ...orderData[index], ...updates }
    return { ...orderData[index] }
  },
  
  async delete(id) {
    await delay(250)
    const index = orderData.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    orderData.splice(index, 1)
    return true
  }
}