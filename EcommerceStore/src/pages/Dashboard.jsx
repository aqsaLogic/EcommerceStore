import { useNavigate } from 'react-router-dom'
import { useAuth }     from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import Card            from '../components/Card'

export default function Dashboard() {
 
  const { user, logout }  = useAuth()      
  const { products }      = useProducts()  
  const navigate          = useNavigate()

  const totalProducts = products.length

  const totalValue = products.reduce((sum, p) => sum + p.price, 0)

  const avgPrice = Math.round(totalValue / totalProducts)

  const avgRating = (products.reduce((s, p) => s + p.rating, 0) / totalProducts).toFixed(1)

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})
  const categoryList = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])
  const maxCount     = categoryList[0][1] 
  const topCategory  = categoryList[0][0]

  const stats = [
    { label: 'Products', value: totalProducts, icon: '📦' },
    { label: 'Catalogue Value',value: `Rs:${totalValue.toLocaleString()}`, icon: '💰' },
    { label: 'Avg Price', value: `PKR${avgPrice}`, icon: '🏷️' },
    { label: 'Avg Rating', value: `${avgRating} ★`, icon: '⭐' },
  ]

  function handleLogout() {
    logout()             
    navigate('/login')   
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-body text-white">
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md
                         border-b border-white/5 px-6 md:px-10 py-4
                         flex items-center justify-between">

        <span className="font-display text-2xl font-bold text-white">
            My{' '}
          <span className="text-gold text-xs font-body font-semibold tracking-[0.25em] uppercase">
            Store
          </span>
        </span>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-white/40 text-sm">
            Hi, <span className="text-white font-semibold">{user?.name}</span>
          </span>

          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-9 h-9 rounded-full border-2 border-gold/30 bg-charcoal object-cover"/>
          <button onClick={handleLogout}
            className="text-xs font-semibold text-white/40 hover:text-rust
                       border border-white/10 hover:border-rust/40
                       rounded-full px-4 py-1.5 transition-all duration-200">Logout  </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-10">
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards' }}>       
  
          <p className="text-rust text-xs tracking-[0.3em] uppercase font-semibold mb-1">
            {user?.role}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0]} 
          </h1>
          <p className="text-white/30 text-sm mt-2">{user?.email}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="opacity-0 animate-fade-up bg-white/5 border border-white/8
                         rounded-2xl p-5 hover:bg-white/8 hover:border-gold/20
                         transition-all duration-300 group"
              style={{ animationDelay: `${80 + i * 70}ms`, animationFillMode: 'forwards' }}>
            
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="font-display text-3xl font-bold text-white
                              group-hover:text-gold transition-colors duration-200">
                {s.value}
              </div>
              <div className="text-white/30 text-xs uppercase tracking-widest mt-1 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          <div className="flex-1">
            <div
              className="flex items-center justify-between mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '360ms', animationFillMode: 'forwards' }}
            >
              <h2 className="font-display text-2xl font-bold text-white">
                All Products
                <span className="ml-3 text-sm font-body font-normal text-white/30">
                  ({totalProducts} items)
                </span>
              </h2>
              <span className="text-xs text-white/30 font-body">
                Click any card for details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fade-up"
                  style={{
                    animationDelay: `${400 + i * 70}ms`,
                    animationFillMode: 'forwards',
                  }}>
                
                  <Card product={product} dark />
                </div>
              ))}
            </div>
          </div>

          <div
            className="xl:w-64 w-full bg-white/5 border border-white/8 rounded-2xl p-6
                        flex flex-col gap-5 opacity-0 animate-fade-up xl:sticky xl:top-24"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          
            <div>
              <h2 className="font-display text-lg font-semibold text-white">Categories</h2>
              <p className="text-white/30 text-xs mt-0.5">
                Top: <span className="text-gold">{topCategory}</span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {categoryList.map(([cat, count], i) => (
                <div key={cat}>

                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">{cat}</span>
                    <span className="text-white/80 font-semibold">{count}</span>
                  </div>

                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rust to-gold"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/8" />

            <div className="text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total Value</p>
              <p className="font-display text-2xl font-bold text-gold">
                Rs:{totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
