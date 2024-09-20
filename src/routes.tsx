import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import Login from './pages/Login'
import Home from './pages/Home'
import Registration from './pages/Registration'

const PageRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const pathName = location.pathname

    if (isAuthenticated) {
      if (pathName === '/login' || pathName === '/register') {
        navigate('/home', { replace: true })
      }
    } else {
      if (pathName === '/home' || pathName === '/') {
        navigate('/login', { replace: true })
      }
    }
  }, [isAuthenticated, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default PageRoutes
