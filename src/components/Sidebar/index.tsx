import { Button } from '@mui/material'

import { useAuth } from '../../contexts/AuthContext'

import * as S from './styles'

const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <S.Container>
      <div className="userData">
        <img
          className="avatar"
          src={user?.avatar}
          alt={`${user?.first_name} ${user?.last_name} avatar`}
        />
        <p className="email">{user?.email}</p>
        <p>{`${user?.first_name} ${user?.last_name}`}</p>
      </div>
      <Button variant="contained" onClick={logout}>
        Sair
      </Button>
    </S.Container>
  )
}

export default Sidebar
