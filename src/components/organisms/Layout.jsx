import { useState } from 'react'
import Header from '@/components/organisms/Header'
import CartSidebar from '@/components/molecules/CartSidebar'
import { useCart } from '@/hooks/useCart'
import { useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()
  
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }
  
  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={cartItems.length}
        onCartToggle={handleCartToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCartToggle}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default Layout