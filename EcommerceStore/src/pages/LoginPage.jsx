import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const { login, user } = useAuth()
  const navigate = useNavigate()

  // agar pehle se login hai toh ligin skip krde ga
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true })
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)

    const userData = {
      name:   email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
      role:   'Store Manager',
    }

    // save to authocontext
    login(userData)
    navigate('/dashboard')
  }
  return (
    <div className="min-h-screen flex bg-charcoal font-body overflow-hidden">

      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-16 overflow-hidden">

        {/*mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-charcoal to-[#0d0d0d]" />
        <div className="absolute top-[-20%] left-[-10%] w-600px h-600px rounded-full
                        bg-rust/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-400px h-400px rounded-full
                        bg-gold/10 blur-[100px] animate-pulse [animation-delay:1.5s]" />

        {/* grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
                      backgroundSize: '60px 60px' }} />

        {/* Content */}
        <div className="relative z-10 text-center">
          <p className="text-rust text-xs tracking-[0.4em] uppercase font-semibold mb-6">
            Welcome back
          </p>
          <h1 className="font-display text-7xl font-bold text-white leading-none mb-6">
            My Store
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/40 text-sm leading-relaxed max-w-xs font-body">
            Your premium ecommerce management platform. Sign in to access your store dashboard.
          </p>

          <div className="mt-14 flex gap-10 justify-center">
            {[['6', 'Products'], ['∞', 'Orders'], ['24/7', 'Support']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl text-gold font-bold">{val}</div>
                <div className="text-white/30 text-xs mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#141414]">
        <div className="w-full max-w-sm opacity-0 animate-fade-up"
             style={{ animationFillMode: 'forwards' }}>

          {/* Mobile ka logo (hide on lg) */} 
          <div className="lg:hidden text-center mb-10">
            <h1 className="font-display text-5xl font-bold text-white">LUXE</h1>
            <div className="w-8 h-px bg-gold mx-auto mt-3" />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="font-display text-3xl font-bold text-white mb-1">Sign in</h2>
            <p className="text-white/40 text-sm mb-8 font-body">Enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs uppercase tracking-widest font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                             text-white text-sm placeholder:text-white/20
                             focus:outline-none focus:border-gold/60 focus:bg-white/8
                             transition-all duration-200 font-body"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs uppercase tracking-widest font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12
                               text-white text-sm placeholder:text-white/20
                               focus:outline-none focus:border-gold/60
                               transition-all duration-200 font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60
                               transition-colors text-xs font-body"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-rust text-xs bg-rust/10 border border-rust/20 rounded-lg px-3 py-2 font-body">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-rust text-white font-body font-semibold py-3.5 rounded-xl
                           hover:bg-rust/80 active:scale-[0.98] transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed text-sm
                           relative overflow-hidden"
              >
                {loading ? (
                  // Loading s
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Signing in…
                  </span>
                ) : 'Sign In →'}
              </button>
            </form>

            {/* hint */}
            <p className="text-center text-white/20 text-xs mt-6 font-body">
              Demo: any email + 6+ char password
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
