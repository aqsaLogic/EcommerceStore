import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('store_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function login(userData) {
    setUser(userData)
    sessionStorage.setItem('store_user', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('store_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
