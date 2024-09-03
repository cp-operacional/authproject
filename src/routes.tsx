import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import Login from './pages/Login'
import Home from './pages/Home'

const PageRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const pathName = location.pathname

    if (isAuthenticated && pathName === '/login') {
      navigate('/home', { replace: true })
    } else if (!isAuthenticated && pathName !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default PageRoutes
