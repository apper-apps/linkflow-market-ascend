import { useState, useEffect } from 'react'

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  
  useEffect(() => {
    const savedCart = localStorage.getItem('linkflow-cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('linkflow-cart', JSON.stringify(cartItems))
  }, [cartItems])
  
  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(cartItem => cartItem.Id === item.Id)
      if (exists) {
        return prev
      }
      return [...prev, item]
    })
  }
  
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.Id !== itemId))
  }
  
  const clearCart = () => {
    setCartItems([])
  }
  
  const isInCart = (itemId) => {
    return cartItems.some(item => item.Id === itemId)
  }
  
  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart
  }
}