import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/organisms/Layout'
import BrowseSites from '@/components/pages/BrowseSites'
import SiteDetail from '@/components/pages/SiteDetail'
import MyOrders from '@/components/pages/MyOrders'
import Wallet from '@/components/pages/Wallet'
import Checkout from '@/components/pages/Checkout'
import AdminPanel from '@/components/pages/AdminPanel'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Layout>
<Routes>
            <Route path="/" element={<BrowseSites />} />
            <Route path="/sites/:id" element={<SiteDetail />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  )
}

export default App