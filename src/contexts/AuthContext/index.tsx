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
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  )
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = useMemo(() => !!token, [token])

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const res = await fetch('https://reqres.in/api/users/2')
        const data = await res.json()
        setUser(data.data)
      }
    }

    fetchUser()
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await fetch('https://reqres.in/api/login/', {
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
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      localStorage.removeItem('token')
      setToken('')
      setUser(null)
      throw new Error(data.error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
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
