import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const API_URL = 'https://server-production-b1cd.up.railway.app/api/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { selectedProduct, setSelectedProduct } = useProducts()
  const { user, logout } = useAuth()
  const { addToCart, totalItems = 0 } = useCart()  // ← yeh add karo

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (selectedProduct && selectedProduct._id === id) {
      setProduct(selectedProduct)
      return
    }
    fetchProduct()
  }, [id])

  async function fetchProduct() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/products/${id}`)
      if (!response.ok) throw new Error('Product not found')
      const data = await response.json()
      setProduct(data)
      setSelectedProduct(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
        <p>Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="spinner-wrap">
        <p>⚠️ {error}</p>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="detail-page">

      {/* Navbar */}
      <header className="navbar">
        <nav className="navbar-breadcrumb">
          <button onClick={() => navigate('/dashboard')}>My</button>
          <span className="sep">/</span>
          <span className="crumb">{product.name}</span>
        </nav>
        <div className="navbar-right">
        <button className="cart-icon-btn" onClick={() => navigate('/cart')}>
            🛒 Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <img className="navbar-avatar" src={user?.avatar} alt={user?.name} />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="detail-main">
        <div className="detail-grid">

          {/* img */}
          <div className="detail-img-wrap">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <div className="detail-no-img">No Image</div>
            )}
          </div>

          {/* info */}
          <div className="detail-info">

            <div className="detail-meta">
              <span className="detail-badge">{product.category}</span>
            </div>

            <h1 className="detail-name">{product.name}</h1>

            <p className="detail-price">
              Rs.{product.price}
              <small>PKR</small>
            </p>

            <div className="detail-divider" />

            <div>
              <p className="detail-about-label">About this product</p>
              <p className="detail-desc">
                {product.description || 'No description available.'}
              </p>
            </div>

            <div className="detail-actions">
              <button className="cart-btn" onClick={() => { addToCart(product); navigate('/cart') }}>Add to Cart</button>
              <button className="back-btn" onClick={() => navigate('/dashboard')}>
                ← Dashboard
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
