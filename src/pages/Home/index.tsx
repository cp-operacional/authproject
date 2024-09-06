import { Typography } from '@mui/material'

import { ColorsProvider } from '../../contexts/ColorsContext'

import ColorsList from '../../components/ColorsList'

import * as S from './styles'

const Home = () => {
  return (
    <ColorsProvider>
      <S.Container className="container">
        <Typography variant="h4" textAlign={'center'}>
          Lista de cores
        </Typography>
        <ColorsList />
      </S.Container>
    </ColorsProvider>
  )
}

export default Home
