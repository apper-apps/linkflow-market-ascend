import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import { useCart } from '@/hooks/useCart'
import { orderService } from '@/services/api/orderService'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/')
    }
  }, [cartItems, navigate])
  
  const handleCardDetailsChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Create orders for each item
      const orders = cartItems.map(item => ({
        siteId: item.Id,
        price: item.price,
        status: 'pending',
        createdAt: new Date().toISOString()
      }))
      
      await Promise.all(orders.map(order => orderService.create(order)))
      
      clearCart()
      toast.success('Payment successful! Your orders have been placed.')
      navigate('/orders')
    } catch (err) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }
  
  if (cartItems.length === 0) {
    return null
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-card p-6 mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your sponsored content placement orders</p>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Method
          </h2>
          
          <div className="space-y-4 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
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
              className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === 'paypal' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <ApperIcon name="Wallet" className="w-5 h-5" />
              <span className="font-medium">PayPal</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'card' && (
              <>
                <Input
                  label="Card Number"
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardDetailsChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardDetailsChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardDetailsChange('cvv', e.target.value)}
                    placeholder="123"
                    required
                  />
                </div>
                
                <Input
                  label="Cardholder Name"
                  type="text"
                  value={cardDetails.cardName}
                  onChange={(e) => handleCardDetailsChange('cardName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <ApperIcon name="Wallet" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  You will be redirected to PayPal to complete your payment
                </p>
              </div>
            )}
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={processing}
              className="w-full"
            >
              {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.url}</p>
                  <Badge variant="primary" size="small" className="mt-1">
                    {item.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ${item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Processing Fee</span>
              <span className="text-gray-900">$0.00</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <ApperIcon name="Shield" className="w-4 h-4" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and secure
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout