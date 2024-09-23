import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect
} from 'react'

import fetchWithAuth from '../../utils/fetchWithAuth'

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
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void
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
        const res = await fetchWithAuth(
          `${process.env.REACT_APP_API_URL}/auth/users/me/`
        )
        const data = await res.json()
        setUser(data)
      }
    }

    fetchUser()
  }, [accessToken])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/token/`, {
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
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
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

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })

      const data = await res.json()

      if (res.status === 201) {
        return data
      } else {
        throw new Error(data.error || 'Erro ao registrar usuário')
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated }}
    >
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
