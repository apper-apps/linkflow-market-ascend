import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

const Header = ({ cartItemCount, onCartToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
const navigation = [
    { name: 'Browse Sites', href: '/', icon: 'Search' },
    { name: 'My Orders', href: '/orders', icon: 'Package' },
    { name: 'Wallet', href: '/wallet', icon: 'Wallet' },
    { name: 'Admin Panel', href: '/admin', icon: 'Settings' },
  ]
  const isActive = (path) => location.pathname === path
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            <div className="font-display font-bold text-xl text-gray-900">
              LinkFlow Market
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="small"
              icon="ShoppingCart"
              onClick={onCartToggle}
              className="relative"
            >
              Cart
              {cartItemCount > 0 && (
                <Badge variant="error" size="small" className="absolute -top-2 -right-2 min-w-[20px] h-5">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="small"
              icon="User"
              className="hidden md:flex"
            >
              Account
            </Button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 w-full">
                  <ApperIcon name="User" className="w-4 h-4" />
                  Account
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header