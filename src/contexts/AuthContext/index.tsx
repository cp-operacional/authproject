import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect
} from 'react'

type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('access') || ''
  )
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem('refresh') || ''
  )
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        const res = await fetch('http://127.0.0.1:8000/auth/users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await res.json()
        setUser(data)
      }
    }

    fetchUser()
  }, [accessToken])

  const login = async (email: string, password: string) => {
    const res = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await res.json()

    if (res.status === 200) {
      localStorage.setItem('access', data.access)
      setAccessToken(data.access)
      localStorage.setItem('refresh', data.refresh)
      setRefreshToken(data.refresh)
    } else {
      localStorage.removeItem('access')
      setAccessToken('')
      localStorage.removeItem('refresh')
      setRefreshToken('')
      setUser(null)
      throw new Error(data.error)
    }
  }

  const logout = () => {
    localStorage.removeItem('access')
    setAccessToken('')
    localStorage.removeItem('refresh')
    setRefreshToken('')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
