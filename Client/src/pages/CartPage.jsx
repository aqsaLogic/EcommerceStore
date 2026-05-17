import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CartPage() {
  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="detail-page">

      {/* Navbar */}
      <header className="navbar">
        <nav className="navbar-breadcrumb">
          <button onClick={() => navigate('/dashboard')}>My Store</button>
          <span className="sep">/</span>
          <span className="crumb">Cart ({totalItems})</span>
        </nav>
        <div className="navbar-right">
          <img className="navbar-avatar" src={user?.avatar} alt={user?.name} />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="cart-main">

        <h1 className="cart-heading">Your Cart</h1>

        {/* Empty cart */}
        {cartItems.length === 0 && (
          <div className="cart-empty">
            <p>🛒</p>
            <p>Your cart is empty</p>
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              ← Continue Shopping
            </button>
          </div>
        )}

        {/* Cart items */}
        {cartItems.length > 0 && (
          <div className="cart-content">

            {/* Items list */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item">

                  {/* Image */}
                  <div className="cart-item-img">
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt={item.name} />
                      : <div className="cart-no-img">No Image</div>
                    }
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">Rs.{item.price} × {item.quantity}</p>
                  </div>

                  {/* Total + Remove */}
                  <div className="cart-item-right">
                    <p className="cart-item-total">Rs.{item.price * item.quantity}</p>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="cart-summary-row">
                <span>Total Price</span>
                <span>Rs.{totalPrice}</span>
              </div>
              <button className="cart-checkout-btn">
                Checkout
              </button>
              <button className="back-btn" onClick={() => navigate('/dashboard')}>
                ← Continue Shopping
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
