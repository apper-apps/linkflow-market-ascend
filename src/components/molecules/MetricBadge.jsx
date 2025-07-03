import Badge from '@/components/atoms/Badge'

const MetricBadge = ({ type, value, className = '' }) => {
  const getVariantAndDisplay = () => {
    switch (type) {
      case 'da':
        if (value >= 70) return { variant: 'success', display: `DA ${value}` }
        if (value >= 40) return { variant: 'warning', display: `DA ${value}` }
        return { variant: 'error', display: `DA ${value}` }
      
      case 'dr':
        if (value >= 70) return { variant: 'success', display: `DR ${value}` }
        if (value >= 40) return { variant: 'warning', display: `DR ${value}` }
        return { variant: 'error', display: `DR ${value}` }
      
      case 'traffic':
        if (value >= 100000) return { variant: 'success', display: `${(value / 1000).toFixed(0)}K` }
        if (value >= 10000) return { variant: 'warning', display: `${(value / 1000).toFixed(0)}K` }
        return { variant: 'info', display: `${(value / 1000).toFixed(1)}K` }
      
      case 'spam':
        if (value <= 10) return { variant: 'success', display: `${value}%` }
        if (value <= 30) return { variant: 'warning', display: `${value}%` }
        return { variant: 'error', display: `${value}%` }
      
      default:
        return { variant: 'default', display: value }
    }
  }
  
  const { variant, display } = getVariantAndDisplay()
  
  return (
    <Badge variant={variant} size="small" className={className}>
      {display}
    </Badge>
  )
}

export default MetricBadge