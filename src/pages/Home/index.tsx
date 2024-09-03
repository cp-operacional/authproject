import { Button, Typography } from '@mui/material'

import { useAuth } from '../../contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()

  return (
    <div className="container">
      <Typography variant="h2" textAlign={'center'}>
        Home
      </Typography>
      <Button variant="contained" onClick={logout}>
        Sair
      </Button>
    </div>
  )
}

export default Home
