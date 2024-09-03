import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'

import { GlobalStyle } from './styles'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <PageRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
