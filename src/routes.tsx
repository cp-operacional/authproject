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

    const isInLoginPage = pathName === '/login'
    const isHome = pathName === '/home'

    if (isAuthenticated && isInLoginPage) {
      navigate('/home', { replace: true })
    } else if (!isAuthenticated && isHome) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {!isAuthenticated && (
        <Route path="/registration" element={<Registration />} />
      )}
    </Routes>
  )
}

export default PageRoutes
