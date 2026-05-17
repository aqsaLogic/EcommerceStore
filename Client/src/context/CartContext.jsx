import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Add to cart
  function addToCart(product) {
    // Agar pehle se hai toh quantity increase krdo
    const existing = cartItems.find(item => item._id === product._id)
    if (existing) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  // Remove from cart
  function removeFromCart(id) {
    setCartItems(cartItems.filter(item => item._id !== id))
  }

  // Total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
