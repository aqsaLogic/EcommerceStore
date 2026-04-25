import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }     from './context/AuthContext'
import { ProductProvider }  from './context/ProductContext'
import ProtectedRoute       from './components/ProtectedRoute'
import LoginPage            from './pages/LoginPage'
import Dashboard            from './pages/Dashboard'
import ProductDetail        from './pages/ProductDetail'

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  )
}
