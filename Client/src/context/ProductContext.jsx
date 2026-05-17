import { createContext, useContext, useState, useEffect } from 'react'

const API_URL = 'https://server-production-b1cd.up.railway.app/api'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/products`)
      if (!response.ok) throw new Error('Something went wrong')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  async function addProduct(productData) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Failed to add product')
    }
    const newProduct = await response.json()
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  async function updateProduct(id, productData) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Failed to update product')
    }
    const updated = await response.json()
    setProducts(prev => prev.map(p => p._id === id ? updated : p))
    return updated
  }

  async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Failed to delete product')
    }
    setProducts(prev => prev.filter(p => p._id !== id))
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      selectedProduct,
      setSelectedProduct,
      addProduct,
      updateProduct,
      deleteProduct,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used inside ProductProvider')
  return ctx
}
