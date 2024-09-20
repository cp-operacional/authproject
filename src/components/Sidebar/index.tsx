import { Button } from '@mui/material'

import { useAuth } from '../../contexts/AuthContext'
import defaultAvatar from '../../assets/images/unknown.jpg'
import UploadAvatarButton from '../UploadAvatarButton'

import * as S from './styles'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const [userData, setUserData] = useState(user)
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatar)

  useEffect(() => {
    if (user) {
      setAvatarSrc(user.avatar || defaultAvatar)
      console.log(user.avatar)
      console.log('User mudou')
    }
  }, [user])

  return (
    <S.Container>
      <div className="userData">
        <div className="avatar-container">
          <div className="avatar-overlay">
            <UploadAvatarButton />
          </div>
          <img
            className="avatar"
            src={avatarSrc}
            alt={`${user?.first_name} ${user?.last_name} avatar`}
          />
        </div>
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
