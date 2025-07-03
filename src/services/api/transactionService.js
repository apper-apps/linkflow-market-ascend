import transactionData from '@/services/mockData/transactions.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const transactionService = {
  async getAll() {
    await delay(300)
    return [...transactionData]
  },
  
  async getById(id) {
    await delay(200)
    const transaction = transactionData.find(t => t.Id === id)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return { ...transaction }
  },
  
  async create(transaction) {
    await delay(400)
    const newTransaction = {
      ...transaction,
      Id: Math.max(...transactionData.map(t => t.Id)) + 1
    }
    transactionData.push(newTransaction)
    return { ...newTransaction }
  },
  
  async update(id, updates) {
    await delay(300)
    const index = transactionData.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Transaction not found')
    }
    transactionData[index] = { ...transactionData[index], ...updates }
    return { ...transactionData[index] }
  },
  
  async delete(id) {
    await delay(250)
    const index = transactionData.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Transaction not found')
    }
    transactionData.splice(index, 1)
    return true
  }
}