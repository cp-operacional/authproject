import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './routes'

import { useAuth } from './contexts/AuthContext'

import Sidebar from './components/Sidebar'

import { GlobalStyle } from './styles'

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <BrowserRouter>
      <GlobalStyle />
      {isAuthenticated && <Sidebar />}
      <PageRoutes />
    </BrowserRouter>
  )
}

export default App
