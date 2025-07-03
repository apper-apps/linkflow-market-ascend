import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { transactionService } from '@/services/api/transactionService'

const Wallet = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  
  const balance = 1250.00 // This would typically come from a user service
  
  const loadTransactions = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await transactionService.getAll()
      setTransactions(data)
    } catch (err) {
      setError(err.message || 'Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadTransactions()
  }, [])
  
  const handleAddFunds = async (e) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    
    setProcessing(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const transaction = {
        amount: parseFloat(amount),
        type: 'deposit',
        paymentMethod: paymentMethod,
        createdAt: new Date().toISOString()
      }
      
      await transactionService.create(transaction)
      
      toast.success(`$${amount} added to your wallet successfully!`)
      setAmount('')
      setShowAddFunds(false)
      loadTransactions()
    } catch (err) {
      toast.error('Failed to add funds. Please try again.')
    } finally {
      setProcessing(false)
    }
  }
  
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return 'Plus'
      case 'purchase':
        return 'ShoppingCart'
      case 'refund':
        return 'RotateCcw'
      default:
        return 'DollarSign'
    }
  }
  
  const getTransactionVariant = (type) => {
    switch (type) {
      case 'deposit':
        return 'success'
      case 'purchase':
        return 'primary'
      case 'refund':
        return 'info'
      default:
        return 'default'
    }
  }
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="bg-white rounded-xl shadow-card p-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <Loading type="list" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error message={error} onRetry={loadTransactions} />
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Wallet Balance
            </h2>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Wallet" className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            ${balance.toFixed(2)}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <Button
            variant="primary"
            size="large"
            icon="Plus"
            onClick={() => setShowAddFunds(true)}
            className="w-full"
          >
            Add Funds
          </Button>
        </motion.div>
      </div>
      
      {showAddFunds && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-card p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add Funds to Wallet
          </h3>
          <form onSubmit={handleAddFunds} className="space-y-4">
            <Input
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="10"
              max="5000"
              step="0.01"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <ApperIcon name="CreditCard" className="w-5 h-5" />
                  <span className="font-medium">Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === 'paypal' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <ApperIcon name="Wallet" className="w-5 h-5" />
                  <span className="font-medium">PayPal</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                loading={processing}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Add ${amount || '0.00'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAddFunds(false)}
                disabled={processing}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}
      
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Transaction History
        </h3>
        
        {transactions.length === 0 ? (
          <Empty
            title="No transactions yet"
            description="Your transaction history will appear here"
            icon="Receipt"
          />
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <ApperIcon 
                      name={getTransactionIcon(transaction.type)} 
                      className="w-5 h-5 text-white" 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(transaction.createdAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.type === 'deposit' || transaction.type === 'refund' 
                      ? 'text-success' 
                      : 'text-gray-900'
                  }`}>
                    {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                    ${transaction.amount.toFixed(2)}
                  </div>
                  <Badge variant={getTransactionVariant(transaction.type)} size="small">
                    {transaction.paymentMethod}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wallet