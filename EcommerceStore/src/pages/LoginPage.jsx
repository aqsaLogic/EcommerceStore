import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  const { login, user } = useAuth()
  const navigate        = useNavigate()

  // Already logged in — skip login page
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
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
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)

    const userData = {
      name:   email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
      role:   'Store Manager',
    }

    login(userData)
    navigate('/dashboard')
  }

  return (
    <div className="login-page">

      {/* Left — brand panel */}
      <div className="login-left">
        <div className="login-glow" />
        <div className="login-brand">
          <p className="login-welcome">Welcome back</p>
          <h1>My Store</h1>
          <div className="divider" />
          <p>Your premium ecommerce management platform. Sign in to access your store dashboard.</p>
          <div className="login-stats">
            {[['All', 'Products'], ['∞', 'Orders'], ['24/7', 'Support']].map(([val, label]) => (
              <div key={label} className="login-stat">
                <span className="login-stat-val">{val}</span>
                <span className="login-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="login-right">
        <div className="login-card">
          <h2>Sign in</h2>
          <p className="subtitle">Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>
              <div className="pass-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-pass"
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <div className="form-error">{error}</div>}

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="login-spinner">
                  <svg className="spin-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>

          </form>

          <p className="login-hint">Demo: any email + 6+ char password</p>
        </div>
      </div>
    </div>
  )
}
