import { Button, Typography } from '@mui/material'

import { useAuth } from '../../contexts/AuthContext'

import ColorsList from '../../components/ColorsList'

const Home = () => {
  const { logout } = useAuth()

  return (
    <div className="container">
      <Typography variant="h3" textAlign={'center'}>
        Home
      </Typography>
      <ColorsList />
      <Button variant="contained" onClick={logout}>
        Sair
      </Button>
    </div>
  )
}

export default Home
