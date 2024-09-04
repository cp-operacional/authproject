import { Typography } from '@mui/material'

import ColorsList from '../../components/ColorsList'

const Home = () => {
  return (
    <div className="container">
      <Typography variant="h3" textAlign={'center'}>
        Home
      </Typography>
      <ColorsList />
    </div>
  )
}

export default Home
