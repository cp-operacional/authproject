import { useRef } from 'react'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { useAuth } from '../../contexts/AuthContext'

import * as S from './styles'

const Sidebar = () => {
  const { user, logout, updateAvatar } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await updateAvatar(file)
      } catch (error) {
        console.error('Erro ao atualizar o avatar:', error)
      }
    }
  }

  return (
    <S.Container>
      <div className="userData">
        <S.AvatarContainer onClick={() => fileInputRef.current?.click()}>
          <S.Avatar
            src={user?.avatar}
            alt={`${user?.first_name} ${user?.last_name} avatar`}
          />
          <div className="avatarOverlay">
            <EditIcon className="editIcon" />
          </div>
        </S.AvatarContainer>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange} // Adicione esta linha
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
