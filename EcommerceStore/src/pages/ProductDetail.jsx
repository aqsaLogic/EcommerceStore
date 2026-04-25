
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, selectedProduct, setSelectedProduct } = useProducts()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!selectedProduct || selectedProduct.id !== Number(id)) {
      const found = products.find((p) => p.id === Number(id))
      if (found) setSelectedProduct(found)
    }
  }, [id])

  const product =
    selectedProduct?.id === Number(id) ? selectedProduct : products.find((p) => p.id === Number(id))

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] gap-4">
        <p className="font-display text-2xl text-white">Product not found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm font-semibold bg-rust text-white px-6 py-2.5 rounded-full hover:bg-rust/80 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  // star booleans
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating))

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-body text-white">
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md
                         border-b border-white/5 px-6 md:px-10 py-4
                         flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate('/dashboard')}
            className="font-display text-xl font-bold text-white hover:text-gold transition-colors"
          >
            My Store
          </button>
          <span className="text-white/20">/</span>
          <span className="text-white/50 truncate max-w-160px sm:max-w-xs">{product.name}</span>
        </nav>
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full border border-gold/30 object-cover"
          />
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-white/40 hover:text-rust
                       border border-white/10 hover:border-rust/40
                       rounded-full px-3 py-1.5 transition-all duration-200 hidden sm:block"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* left product img */}
          <div
            className="rounded-3xl overflow-hidden aspect-[4/5]
                        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                        opacity-0 animate-fade-up"
            style={{ animationFillMode: 'forwards' }}>          
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* right product info */}
          <div
            className="flex flex-col gap-6 pt-2 opacity-0 animate-fade-up"
            style={{ animationDelay: '120ms', animationFillMode: 'forwards' }}
          >

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest
                               text-white bg-rust px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-white/30 text-xs">ID #{product.id}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Star rating */}
            <div className="flex items-center gap-1.5">
              {stars.map((filled, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${filled ? 'text-gold' : 'text-white/20'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                           00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
                           00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8
                           -2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539
                           -1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38
                           -1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white/40 text-sm ml-1">{product.rating} / 5.0</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold text-white">Rs:{product.price}</span>
              <span className="text-white/30 text-sm">PKR</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8" />
            {/* desc */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
                About this piece
              </p>
              <p className="text-white/60 leading-relaxed text-[15px]">
                {product.description}
              </p>
            </div>

            {/* btns  */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-rust text-white font-semibold py-3.5
                                 rounded-full hover:bg-rust/80 active:scale-95
                                 transition-all duration-200 text-sm">
                Add to Cart
              </button> 
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3.5 rounded-full border border-white/20 text-white/60
                           font-semibold text-sm hover:border-white/50 hover:text-white
                           active:scale-95 transition-all duration-200"
              >
                ← Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
