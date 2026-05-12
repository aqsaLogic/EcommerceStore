import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import Card from '../components/Card'

const emptyForm = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  category: '',
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts()
  const navigate = useNavigate()

  // Modal state — 'add', 'edit', or null
  const [modalMode, setModalMode] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  // Confirm delete modal
  const [confirmId, setConfirmId] = useState(null)

  // Stats
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = totalProducts ? Math.round(totalValue / totalProducts) : 0

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Open Add modal
  function openAddModal() {
    setForm(emptyForm)
    setFormError('')
    setModalMode('add')
  }

  // Open Edit modal 
  function openEditModal(product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      category: product.category,
    })
    setFormError('')
    setModalMode('edit')
  }

  function closeModal() {
    setModalMode(null)
    setEditingProduct(null)
    setForm(emptyForm)
    setFormError('')
  }

  // Add Product submit
  async function handleAddProduct(e) {
    e.preventDefault()
    setFormError('')
    if (Number(form.price) <= 0) {
      setFormError('Price must be greater than 0')
      return
    }
    setFormLoading(true)
    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
      })
      closeModal()
    } catch (err) {
      setFormError(err.message)
    }
    setFormLoading(false)
  }

  // Update Product submit
  async function handleUpdateProduct(e) {
    e.preventDefault()
    setFormError('')
    if (Number(form.price) <= 0) {
      setFormError('Price must be greater than 0')
      return
    }
    setFormLoading(true)
    try {
      await updateProduct(editingProduct._id, {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
      })
      closeModal()
    } catch (err) {
      setFormError(err.message)
    }
    setFormLoading(false)
  }

  // Show confirm modal
  function handleDelete(id) {
    setConfirmId(id)
  }

  // Confirmed — actually delete
  async function confirmDelete() {
    try {
      await deleteProduct(confirmId)
      setConfirmId(null)
    } catch (err) {
      setConfirmId(null)
      alert('Failed to delete: ' + err.message)
    }
  }

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <header className="navbar">
        <span className="navbar-brand">LUXE <span>Store</span></span>
        <div className="navbar-right">
          <span className="navbar-greeting">Hi, <strong>{user?.name}</strong></span>
          <img className="navbar-avatar" src={user?.avatar} alt={user?.name} />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">

        {/* Welcome */}
        <div>
          <p className="welcome-label">{user?.role}</p>
          <h1 className="welcome-heading">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="welcome-email">{user?.email}</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <p className="stat-value">{loading ? '—' : totalProducts}</p>
            <p className="stat-label">Total Products</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <p className="stat-value">{loading ? '—' : `$${totalValue}`}</p>
            <p className="stat-label">Total Value</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏷️</div>
            <p className="stat-value">{loading ? '—' : `$${avgPrice}`}</p>
            <p className="stat-label">Avg Price</p>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="section-header">
            <h2 className="section-title">
              All Products
              {!loading && <span className="section-count">({totalProducts})</span>}
            </h2>
            <button className="add-btn" onClick={openAddModal}>+ Add Product</button>
          </div>

          {/* Error */}
          {error && (
            <div className="error-banner">
              <strong>⚠️ Failed to load products</strong>
              {error} — Make sure backend is running
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton-body">
                    <div className="skeleton-line" style={{ width: '60%' }} />
                    <div className="skeleton-line" style={{ width: '80%' }} />
                    <div className="skeleton-line" style={{ width: '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <div className="product-grid">
              {products.map(product => (
                <Card
                  key={product._id}
                  product={product}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
              {products.length === 0 && (
                <div className="empty-state">
                  <p>📦</p>
                  <p>No products yet. Click "Add Product".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Modal (Add + Edit share same UI) ── */}
      {modalMode && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            <div className="modal-header">
              <h2>{modalMode === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct}>

              <div className="input-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Wool Blazer"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 199"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  min="1"
                />
              </div>

              <div className="input-group">
                <label>Category *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Outerwear"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Image URL (optional)</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={handleFormChange}
                />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="modal-textarea"
                  placeholder="Describe the product..."
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>

              {formError && <div className="form-error">{formError}</div>}

              <div className="modal-actions">
                <button type="submit" className="modal-submit" disabled={formLoading}>
                  {formLoading
                    ? modalMode === 'add' ? 'Adding...' : 'Saving...'
                    : modalMode === 'add' ? 'Add Product' : 'Save Changes'
                  }
                </button>
                <button type="button" className="modal-cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ── Confirm Del Modal ── */}
      {confirmId && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <p className="confirm-icon">🗑️</p>
            <h3>Delete Product?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="confirm-no" onClick={() => setConfirmId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
