import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { products }     = useProducts()  
  const { user, logout } = useAuth()     
  const navigate         = useNavigate()

  return (
    <main className="min-h-screen bg-cream">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5
                      border-b border-black/5 bg-cream/80 backdrop-blur-sm sticky top-0 z-40">
        {/* Logo */}
        <span className="font-display text-2xl font-bold text-charcoal">My Store</span>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* LOGIN K BAAD show Dashboard link 0r logout */}
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm font-semibold text-charcoal border border-charcoal/20
                           px-4 py-1.5 rounded-full hover:bg-charcoal hover:text-cream
                           transition-all duration-200">             
                Dashboard
              </button>
              <button
                onClick={() => { logout(); navigate('/login') }}
                className="text-sm text-gray-400 hover:text-rust transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // If not login show Login button
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold bg-charcoal text-cream px-5 py-1.5
                         rounded-full hover:bg-rust transition-all duration-200"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <header className="px-6 pt-14 pb-10 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-rust font-semibold mb-3">
          New Collection
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-4">
          Shop the Edit
        </h1>
        <div className="w-16 h-px bg-gold mx-auto mb-6" />
        <p className="font-body text-gray-500 max-w-md mx-auto text-base leading-relaxed">
          Thoughtfully curated pieces for those who value craft, material, and quiet confidence.
        </p>
      </header>

      {/* Product grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
