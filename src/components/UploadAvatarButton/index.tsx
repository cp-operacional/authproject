import editIcon from '../../assets/images/edit.png'
import { useAuth } from '../../contexts/AuthContext'

const UploadAvatarButton = () => {
  const uploadAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('No access token found')
      }

      const response = await fetch(
        'http://127.0.0.1:8000/auth/users/upload_avatar/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        }
      )
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadAvatar(e.target.files[0])
    }
  }

  return (
    <>
      <div className="input-group">
        {/* Cria um input invisível que será acionado pelo botão */}
        <input
          id="file"
          type="file"
          style={{ display: 'none' }} // Esconde o input de arquivo
          onChange={handleFileChange}
        />

        {/* Cria um botão estilizado que aciona o input de arquivo */}
        <label htmlFor="file">
          <img src={editIcon} alt="Edit avatar" />
        </label>
      </div>
    </>
  )
}

export default UploadAvatarButton
